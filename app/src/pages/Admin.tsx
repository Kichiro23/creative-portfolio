import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import {
  Shield, Trash2, CheckCircle, Loader2, Inbox,
  ChevronLeft, User, Clock, MailOpen,
} from "lucide-react";

interface Message {
  _id: string;
  read: boolean;
  name: string;
  email: string;
  subject: string | null;
  content: string;
  createdAt: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) navigate("/login");
  }, [user, authLoading, navigate]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = useCallback(async () => {
    if (!user || user.role !== "admin") return;
    try {
      setMessagesLoading(true);
      const [msgRes, countRes] = await Promise.all([
        api.messages.list(),
        api.messages.unreadCount(),
      ]);
      setMessages(msgRes.data);
      setUnreadCount(countRes.data);
    } catch {
      setMessages([]);
      setUnreadCount(0);
    } finally {
      setMessagesLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkRead = async (id: string) => {
    try {
      await api.messages.markRead(id);
      await fetchMessages();
    } catch (err: any) {
      alert(err.message || "Failed to mark as read");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.messages.delete(id);
      await fetchMessages();
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-void)" }}>
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent-coral)" }} />
    </div>
  );
  if (!user || user.role !== "admin") return null;

  const readCount = messages.filter((m) => m.read).length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-void)", color: "var(--text-primary)" }}>
      <header className="sticky top-0 z-50 border-b px-4 md:px-8 h-14 flex items-center justify-between"
        style={{ background: "rgba(6,4,10,0.8)", backdropFilter: "blur(40px)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl transition-colors hover:bg-white/5">
            <ChevronLeft className="w-5 h-5" style={{ color: "var(--text-primary)" }} />
          </Link>
          <Shield className="w-5 h-5" style={{ color: "var(--accent-coral)" }} />
          <h1 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Admin</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl" style={{ background: "var(--bg-surface)" }}>
          <User className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          <span className="text-sm">{user.name || user.email}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Inbox className="w-5 h-5" />, color: "var(--accent-coral)", label: "Total", value: messages.length },
            { icon: <MailOpen className="w-5 h-5" />, color: "var(--accent-violet)", label: "Unread", value: unreadCount },
            { icon: <CheckCircle className="w-5 h-5" />, color: "var(--accent-mint)", label: "Read", value: readCount },
          ].map((stat) => (
            <div key={stat.label} className="liquid-glass p-5">
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: stat.color }}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="liquid-glass overflow-hidden">
          <div className="relative z-10 px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <Inbox className="w-4 h-4" style={{ color: "var(--accent-coral)" }} />
            <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Contact Messages</h2>
          </div>

          {messagesLoading ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" style={{ color: "var(--accent-coral)" }} /></div>
          ) : !messages.length ? (
            <div className="p-12 text-center" style={{ color: "var(--text-muted)" }}>
              <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    {["Status", "Name", "Email", "Subject", "Message", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg._id} className="border-b transition-colors hover:bg-white/[0.02]" style={{ borderColor: "rgba(255,255,255,0.04)", background: !msg.read ? "rgba(255,107,53,0.03)" : "transparent" }}>
                      <td className="px-5 py-4">
                        {!msg.read ? (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,107,53,0.12)", color: "var(--accent-coral)" }}>New</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><CheckCircle className="w-3 h-3" /> Read</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-medium text-sm" style={{ color: "var(--text-primary)" }}>{msg.name}</td>
                      <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{msg.email}</td>
                      <td className="px-5 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{msg.subject || "—"}</td>
                      <td className="px-5 py-4 max-w-xs"><p className="truncate text-sm" style={{ color: "var(--text-muted)" }}>{msg.content}</p></td>
                      <td className="px-5 py-4"><div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><Clock className="w-3 h-3" />{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "—"}</div></td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {!msg.read && (
                            <button onClick={() => handleMarkRead(msg._id)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" title="Mark as read">
                              <CheckCircle className="w-4 h-4" style={{ color: "var(--accent-mint)" }} />
                            </button>
                          )}
                          <button onClick={() => handleDelete(msg._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
