import { useContext } from "react";
import { AckContext } from "./AckContext";

export const useAck = () => {
  const context = useContext(AckContext);
  if (!context) throw new Error("useAck must be used inside AckProvider");
  return context;
};
