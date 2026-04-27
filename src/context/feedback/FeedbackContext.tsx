import { createContext } from "react";
import type {
  StoreFeedbackPayload,
  GetFeedbackResponse,
} from "../../types/feedback";

export interface FeedbackContextType {
  loading: boolean;
  //   feedback: GetFeedbackResponse["data"] | null;

  //   submitFeedback: (payload: StoreFeedbackPayload) => Promise<string>;
  // submitFeedback: (payload: StoreFeedbackPayload) => Promise<boolean>;
  feedbackList: GetFeedbackResponse["data"][];
  submitFeedback: (payload: StoreFeedbackPayload) => Promise<number | null>;
  getFeedbackById: (id: number) => Promise<void>;
}

export const FeedbackContext = createContext<FeedbackContextType | null>(null);
