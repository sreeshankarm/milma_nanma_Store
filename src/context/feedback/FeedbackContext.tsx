import { createContext } from "react";
import type {
  StoreFeedbackPayload,
  // GetFeedbackResponse,
  FeedbackItem,
} from "../../types/feedback";

export interface FeedbackContextType {
  loading: boolean;
  //   feedback: GetFeedbackResponse["data"] | null;

  //   submitFeedback: (payload: StoreFeedbackPayload) => Promise<string>;
  // submitFeedback: (payload: StoreFeedbackPayload) => Promise<boolean>;
  // feedbackList: GetFeedbackResponse["data"][];
  feedbackList: FeedbackItem[];
  submitFeedback: (payload: StoreFeedbackPayload) => Promise<number | null>;
  getFeedbackById: (id: number) => Promise<void>;
  getFeedbackByDateRange: (from: string, to: string) => Promise<void>;
  clearFeedback: () => void;
  getfeedbackloading: boolean;
}

export const FeedbackContext = createContext<FeedbackContextType | null>(null);
