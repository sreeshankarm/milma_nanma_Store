
/* ---------- TYPES ---------- */
export interface StoreFeedbackPayload {
  feedback_text: string;
  file?: File | null;
}

export interface StoreFeedbackResponse {
  status: boolean;
  id: number;
  message: string;
  file_url?: string;
}

export interface GetFeedbackResponse {
  status: boolean;
  data: {
    id: number;
    customer_id: number;
    feedback_text: string;
    file_url?: string;
    file_type?: string;
  };
}


export interface FeedbackItem {
  id: number;
  customer_id: number;
  feedback_text: string;
  file_url?: string;
  file_type?: string;
  feedback_date?: string;
  
}

export interface GetFeedbackListResponse {
  status: boolean;
  data: FeedbackItem[];
}