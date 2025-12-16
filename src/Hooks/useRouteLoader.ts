import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useRouteLoader() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // When route changes → show loader
    setLoading(true);

    // Small delay to show loader (300ms)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading;
}
