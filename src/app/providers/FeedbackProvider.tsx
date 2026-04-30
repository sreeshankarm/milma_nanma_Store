import { useState } from "react";
import {
  storeFeedbackApi,
  getFeedbackByIdApi,
  getFeedbackByDateRangeApi,
} from "../../api/feedback.api";
import { FeedbackContext } from "../../context/feedback/FeedbackContext";
import { toast } from "react-toastify";
import type {
  StoreFeedbackPayload,
  // GetFeedbackResponse,
  FeedbackItem,
} from "../../types/feedback";

export const FeedbackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  //   const [feedback, setFeedback] = useState<any>(null);
  // const [feedbackList, setFeedbackList] = useState<
  //   GetFeedbackResponse["data"][]
  // >([]);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [getfeedbackloading, setGetfeedbackLoading] = useState(false);

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

  // const getFeedbackById = async (id: number) => {
  //   try {
  //     setLoading(true);

  //     const { data } = await getFeedbackByIdApi(id);

  //     if (data.status) {
  //       setFeedbackList((prev) => [data.data, ...prev]); // ✅ add to list
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getFeedbackById = async (id: number) => {
    try {
      setLoading(true);

      const { data } = await getFeedbackByIdApi(id);

      if (data.status) {
        setFeedbackList((prev) => [
          {
            ...data.data,
            feedback_date: "", // ✅ fallback
          },
          ...prev,
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getFeedbackByDateRange = async (from: string, to: string) => {
    try {
      setGetfeedbackLoading(true);

      const { data } = await getFeedbackByDateRangeApi(from, to);

      if (data.status) {
        setFeedbackList(data.data); // ✅ includes feedback_date
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error");
    } finally {
      setGetfeedbackLoading(false);
    }
  };

  const clearFeedback = () => {
    setFeedbackList([]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        loading,
        feedbackList,
        submitFeedback,
        getFeedbackById,
        getFeedbackByDateRange,
        clearFeedback,
        getfeedbackloading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
