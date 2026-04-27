import { useContext } from "react";
import { FeedbackContext } from "./FeedbackContext";

export const useFeedback = () => {
  const ctx = useContext(FeedbackContext);

  if (!ctx) {
    throw new Error(
      "useFeedback must be used inside FeedbackProvider"
    );
  }

  return ctx;
};