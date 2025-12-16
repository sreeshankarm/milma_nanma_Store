import { useMemo, useState } from "react";
import {
  AlertCircle,
  Clock3,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "../context/store/store";
import { ComplaintCategory } from "../types/types";
// import type { ComplaintStatus } from "../types/types";

/* ----------------------------------------
   STATUS BADGE STYLES
---------------------------------------- */
// const statusCls: Record<ComplaintStatus, string> = {
//   Open: "bg-amber-500/15 text-amber-500 border border-amber-500/30",
//   "In Progress": "bg-blue-500/10 text-blue-500 border border-blue-500/30",
//   Responded: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30",
//   Closed: "bg-slate-500/15 text-slate-600 border border-slate-500/30",
// };

/* ----------------------------------------
   DATE FORMATTER
---------------------------------------- */
const formatDate = (date: Date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/* ----------------------------------------
   COMPONENT
---------------------------------------- */
export default function FeedbackCenter() {
  const { complaints, submitComplaint } = useStore();

  const [category, setCategory] = useState<ComplaintCategory>(
    ComplaintCategory.QUALITY
  );
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- SORTED LIST ---------- */
  const list = useMemo(() => {
    if (!Array.isArray(complaints)) return [];
    return [...complaints].sort((a, b) => +b.updatedAt - +a.updatedAt);
  }, [complaints]);

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !contact.trim()) return;

    setLoading(true);
    const res = await submitComplaint(
      category,
      description.trim(),
      contact.trim()
    );
    setMessage(res);
    setDescription("");
    setLoading(false);
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-300/70">
            Support & Feedback
          </p>
          <h1 className="text-2xl font-bold">Complaints / Suggestions</h1>
        </div>
        <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
          <AlertCircle size={22} />
        </div>
      </div>

      {/* ---------- SUBMIT FORM ---------- */}
      <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
            <MessageSquare size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Submit via App</h3>
            <p className="text-sm text-gray-500">
              Raise quality, logistics, product or marketing feedback directly
              from here.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as ComplaintCategory)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none"
              >
                {Object.values(ComplaintCategory).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Mobile / Email
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="For updates"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Complaint / Feedback
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none"
            />
          </div>

          {message && <p className="text-sm text-emerald-600">{message}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#8e2d26] hover:bg-[#b91c1c] transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send size={16} />
            {loading ? "Sending..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      {/* ---------- LIST ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock3 size={16} />
          Live status & replies
        </div>

        {list.map((c) => (
          <div key={c.id} className="bg-white border rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400">
                    {c.id}
                  </span>
                  <span className={`text-[11px] px-2 py-1 rounded-full `}>
                    {c.status}
                  </span>
                </div>

                <p className="font-semibold">{c.category}</p>
                <p className="text-sm text-gray-600">{c.description}</p>
                <p className="text-xs text-gray-400">
                  Channel: {c.channel} • Updated {formatDate(c.updatedAt)}
                </p>
              </div>

              <CheckCircle2 size={20} className="text-emerald-500" />
            </div>

            {c.response && (
              <div className="mt-3 border-t pt-3 text-sm text-emerald-700">
                <b>Reply:</b> {c.response}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
