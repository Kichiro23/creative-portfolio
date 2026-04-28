const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function fetchApi(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }

  return data;
}

export const api = {
  auth: {
    login: (body: { email: string; password: string }) =>
      fetchApi("/auth/login", { method: "POST", body: JSON.stringify(body) }),
    register: (body: { name: string; email: string; password: string }) =>
      fetchApi("/auth/register", { method: "POST", body: JSON.stringify(body) }),
    me: () => fetchApi("/auth/me"),
  },
  projects: {
    list: () => fetchApi("/projects"),
    featured: () => fetchApi("/projects/featured"),
    getBySlug: (slug: string) => fetchApi(`/projects/${slug}`),
    create: (body: Record<string, unknown>) =>
      fetchApi("/projects", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Record<string, unknown>) =>
      fetchApi(`/projects/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id: string) => fetchApi(`/projects/${id}`, { method: "DELETE" }),
  },
  messages: {
    list: () => fetchApi("/messages"),
    create: (body: { name: string; email: string; subject?: string; content: string }) =>
      fetchApi("/messages", { method: "POST", body: JSON.stringify(body) }),
    markRead: (id: string) => fetchApi(`/messages/${id}/read`, { method: "PATCH" }),
    delete: (id: string) => fetchApi(`/messages/${id}`, { method: "DELETE" }),
    unreadCount: () => fetchApi("/messages/unread-count"),
  },
  portfolio: {
    skills: () => fetchApi("/portfolio/skills"),
    experiences: () => fetchApi("/portfolio/experiences"),
  },
};
