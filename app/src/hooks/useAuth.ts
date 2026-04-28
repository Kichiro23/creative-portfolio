import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "@/lib/api";
import { LOGIN_PATH } from "@/const";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface UseAuthOptions {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
}

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } = options ?? {};
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.auth.me();
      setUser(res.user);
      setError(null);
    } catch (err: any) {
      setUser(null);
      setError(err);
      if (err.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (redirectOnUnauthenticated && !isLoading && !user) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [redirectOnUnauthenticated, isLoading, user, navigate, redirectPath]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate(redirectPath);
  }, [navigate, redirectPath]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      const res = await api.auth.login(credentials);
      localStorage.setItem("token", res.token);
      setUser(res.user);
      return res;
    },
    []
  );

  return useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      logout,
      login,
      refresh: fetchUser,
    }),
    [user, isLoading, error, logout, login, fetchUser]
  );
}
