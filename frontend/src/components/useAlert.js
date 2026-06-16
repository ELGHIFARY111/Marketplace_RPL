import { useState, useCallback } from "react";

let _idCounter = 0;

export default function useAlert() {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = "info") => {
    const id = ++_idCounter;
    setAlerts((prev) => [...prev, { id, message, type }]);
  }, []);

  const closeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { alerts, showAlert, closeAlert };
}
