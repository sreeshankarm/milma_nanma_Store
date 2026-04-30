import api from "./axios";
import type {
  StoreFeedbackPayload,
  // StoreFeedbackResponse,
  GetFeedbackResponse,
  GetFeedbackListResponse,
} from "../types/feedback";

/* ---------- API CALLS ---------- */
// export const storeFeedbackApi = (payload: StoreFeedbackPayload) => {
//   const formData = new FormData();

//   formData.append("feedback_text", payload.feedback_text);

//   if (payload.file) {
//     formData.append("file", payload.file);
//   }

//   return api.post<StoreFeedbackResponse>("/storefeedback", formData);
// };

export const storeFeedbackApi = (payload: StoreFeedbackPayload) => {
  const formData = new FormData();

  formData.append("feedback_text", payload.feedback_text);

  // ✅ STRICT FILE CHECK
  if (payload.file instanceof File) {
    formData.append("file", payload.file, payload.file.name);
  }

  return api.post("/storefeedback", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFeedbackByIdApi = (id: number) => {
  const formData = new FormData();
  formData.append("id", String(id));

  return api.post<GetFeedbackResponse>("/getfeedbackbyid", formData);
};

export const getFeedbackByDateRangeApi = (
  from_date: string,
  to_date: string,
) => {
  const formData = new FormData();
  formData.append("from_date", from_date);
  formData.append("to_date", to_date);

  return api.post<GetFeedbackListResponse>("/getfeedbackbydaterange", formData);
};
