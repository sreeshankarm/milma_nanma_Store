import api from "./axios";
import type {
  StoreFeedbackPayload,
  StoreFeedbackResponse,
  GetFeedbackResponse,
} from "../types/feedback";

/* ---------- API CALLS ---------- */
export const storeFeedbackApi = (payload: StoreFeedbackPayload) => {
  const formData = new FormData();

  formData.append("feedback_text", payload.feedback_text);

  if (payload.file) {
    formData.append("file", payload.file);
  }

  return api.post<StoreFeedbackResponse>("/storefeedback", formData);
};

export const getFeedbackByIdApi = (id: number) => {
  const formData = new FormData();
  formData.append("id", String(id));

  return api.post<GetFeedbackResponse>("/getfeedbackbyid", formData);
};