import { useState } from "react";
import { storeFeedbackApi, getFeedbackByIdApi } from "../../api/feedback.api";
import { FeedbackContext } from "../../context/feedback/FeedbackContext";
import { toast } from "react-toastify";
import type {
  StoreFeedbackPayload,
  GetFeedbackResponse,
} from "../../types/feedback";

export const FeedbackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  //   const [feedback, setFeedback] = useState<any>(null);
  const [feedbackList, setFeedbackList] = useState<
    GetFeedbackResponse["data"][]
  >([]);

  /* ---------- SUBMIT ---------- */

  const submitFeedback = async (
    payload: StoreFeedbackPayload,
  ): Promise<number | null> => {
    try {
      setLoading(true);

      const { data } = await storeFeedbackApi(payload);

      if (!data.status) {
        toast.error(data.message);
        return null;
      }

      toast.success(data.message);
      return data.id; // ✅ IMPORTANT
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /* ---------- GET BY ID ---------- */

  const getFeedbackById = async (id: number) => {
    try {
      setLoading(true);

      const { data } = await getFeedbackByIdApi(id);

      if (data.status) {
        setFeedbackList((prev) => [data.data, ...prev]); // ✅ add to list
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        loading,
        feedbackList,
        submitFeedback,
        getFeedbackById,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
