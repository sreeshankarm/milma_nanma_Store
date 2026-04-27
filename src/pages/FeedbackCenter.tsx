import { useState, useRef } from "react";
import {
  AlertCircle,
  MessageSquare,
  Send,
  Paperclip,
  Mic,
  Square,
} from "lucide-react";
import { toast } from "react-toastify";
import { useFeedback } from "../context/feedback/useFeedback";

export default function FeedbackCenter() {
  const { submitFeedback, loading, feedbackList, getFeedbackById } =
    useFeedback();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);



  /* ---------- RECORD ---------- */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.current, {
          type: "audio/webm",
        });

        const audioFile = new File([blob], "voice.webm", {
          type: "audio/webm",
        });

        setFile(audioFile);
        toast.success("Voice recorded successfully");
      };

      mediaRecorder.start();
      setRecording(true);
    } catch {
      toast.error("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  /* ---------- SUBMIT ---------- */

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ VALIDATION
  if (!text.trim()) {
    toast.error("Please enter feedback");
    return;
  }

  try {
    // ✅ SUBMIT
    const id = await submitFeedback({
      feedback_text: text,
      file,
    });

    if (!id) return;

    // ✅ FETCH FROM BACKEND
    await getFeedbackById(id);

    // ✅ RESET FORM
    setText("");
    setFile(null);
  } catch (err) {
    console.error("Submit error:", err);
    toast.error("Something went wrong");
  }
};

  const isDisabled = !text.trim() || loading;

  return (
    <div className="min-h-screen  from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400">
              Support & Feedback
            </p>
            <h1 className="text-2xl font-bold text-gray-800">
              Complaints / Suggestions
            </h1>
          </div>

          <div className="p-3 rounded-xl bg-red-100 text-red-500">
            <AlertCircle size={22} />
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl  border border-gray-200 p-6 space-y-6">
          {/* TITLE */}
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <MessageSquare size={20} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Submit Feedback
              </h3>
              <p className="text-sm text-gray-500">
                Share your issue or suggestion. We’ll get back to you.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* TEXTAREA */}
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Your Feedback
              </label>

              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Describe your issue or suggestion..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none"
              />
            </div>

            {/* FILE + VOICE */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* FILE */}
              <label className="flex-1 flex items-center gap-2 border border-dashed border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                <Paperclip size={16} />
                <span className="text-sm text-gray-600 truncate">
                  {file ? file.name : "Upload file"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              {/* VOICE */}
              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 transition ${
                  recording
                    ? "bg-red-100 text-red-600 border-red-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {recording ? <Square size={16} /> : <Mic size={16} />}
                <span className="text-sm font-medium">
                  {recording ? "Stop Recording" : "Voice Record"}
                </span>
              </button>
            </div>

            {/* SUBMIT */}
            <button
              disabled={isDisabled}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition disabled:opacity-40 cursor-pointer"
            >
              <Send size={16} />
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>

        {/* SUBMITTED LIST */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Submitted Feedback
          </h2>

 

          {feedbackList.length === 0 && (
            <p className="text-sm text-gray-400">No feedback submitted yet</p>
          )}

          {feedbackList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-xl p-4"
            >
              <p className="text-gray-800 text-sm">{item.feedback_text}</p>

              {item.file_url && (
                <audio controls className="mt-2 w-full">
                  <source src={item.file_url} />
                </audio>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
