// src/hooks/useService.js
//
// Fetch a single service by id.
// Returns { service, loading, error, refetch }.

import { useCallback, useEffect, useState } from "react";
import { getService } from "../services/api";

export default function useService(id) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchService = useCallback(async () => {
    if (!id) {
      setService(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getService(id);
      setService(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("notFound");
      } else {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to load service"
        );
      }
      setService(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  return { service, loading, error, refetch: fetchService };
}
