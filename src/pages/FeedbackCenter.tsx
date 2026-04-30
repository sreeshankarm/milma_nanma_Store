import { useState, useRef, useEffect } from "react";
import {
  AlertCircle,
  MessageSquare,
  Send,
  Mic,
  Square,
  Trash2,
  Play,
  FileAudio,
  Clock3,
  Search,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useFeedback } from "../context/feedback/useFeedback";

export default function FeedbackCenter() {
  const {
    submitFeedback,
    loading,
    feedbackList,
    getFeedbackById,
    getFeedbackByDateRange,
    clearFeedback,
    getfeedbackloading,
  } = useFeedback();

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleFetch = async () => {
    if (!startDate || !endDate) {
      toast.error("Select date range");
      return;
    }

    await getFeedbackByDateRange(startDate, endDate);
  };

  /* ---------- FORMAT DATE ---------- */
  const formatDateTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
    });
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    getFeedbackByDateRange(startDate, endDate);
  }, []);

  useEffect(() => {
    return () => {
      clearFeedback();
    };
  }, []);
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!file) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(URL.createObjectURL(file));

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const isRecorded = !!file;

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
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

        {/* DATE FILTER */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <InputDate
              label="From Date"
              value={startDate}
              max={endDate}
              onChange={setStartDate}
            />

            <InputDate
              label="To Date"
              value={endDate}
              min={startDate}
              max={today}
              onChange={setEndDate}
            />

            <button
              onClick={handleFetch}
              disabled={!startDate || !endDate}
              className="h-11 rounded-xl bg-blue-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-950 disabled:bg-gray-300 cursor-pointer"
            >
              {getfeedbackloading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {getfeedbackloading ? "GET FEEDBACK ..." : "GET FEEDBACK"}
            </button>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-6">
          {/* TITLE */}
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <MessageSquare size={20} />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
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

            {/* AUDIO PREVIEW */}

            {file && (
              <div className="flex items-center justify-between gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-4 py-4 shadow-sm w-full">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* PLAY BUTTON */}
                  <button
                    type="button"
                    onClick={handlePlayPause}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-pink-600 text-white flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    {isPlaying ? <Square size={18} /> : <Play size={18} />}
                  </button>

                  {/* TEXT */}
                  <div className="flex flex-col min-w-0 overflow-hidden">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      Recorded Message
                    </p>

                    <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-[260px] md:max-w-[320px]">
                      {file.name}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE (DELETE) */}
                <button
                  type="button"
                  onClick={() => {
                    audioRef.current?.pause();
                    audioRef.current = null;
                    setIsPlaying(false);
                    setFile(null);
                  }}
                  className="text-red-500 hover:text-red-600 flex-shrink-0 cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* RECORD */}

              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                disabled={loading || isRecorded}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition
    ${
      recording
        ? "bg-red-100 text-red-600 border-red-200 animate-pulse"
        : isRecorded
          ? "bg-gray-100 text-gray-600 border-gray-200"
          : "bg-gray-100 hover:bg-gray-200 border-gray-300"
    }
    ${loading || isRecorded ? "opacity-50 cursor-not-allowed" : ""}
  `}
              >
                {recording ? <Square size={16} /> : <Mic size={16} />}

                <span className="text-sm font-medium">
                  {recording
                    ? "Stop Recording"
                    : isRecorded
                      ? "Voice Recorded"
                      : "Voice Record"}
                </span>
              </button>

              {/* SUBMIT */}
              <button
                disabled={isDisabled}
                className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium disabled:opacity-40 cursor-pointer"
              >
                <Send size={16} />
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* SUBMITTED LIST */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Submitted Feedback
          </h2>

          {feedbackList.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <AlertCircle className="text-gray-400 mb-2" size={28} />

              <p className="text-sm text-gray-400">No feedback submitted yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-full flex flex-col justify-between"
                >
                  {/* CONTENT */}
                  <div className="flex gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <MessageSquare size={18} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.feedback_text}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <Clock3 size={12} />
                        {item.feedback_date
                          ? formatDateTime(item.feedback_date)
                          : "Submitted feedback"}
                      </div>
                    </div>
                  </div>

                  {/* AUDIO */}
                  {item.file_url && (
                    <div className="mt-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                        <FileAudio size={16} />
                        Voice Attachment
                      </div>

                      <audio controls className="w-full">
                        <source src={item.file_url} type="audio/aac" />
                      </audio>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InputDate = ({ label, value, onChange, min, max }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>

    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker()}
      onKeyDown={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm
      focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);
