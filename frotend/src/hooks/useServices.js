import { useCallback, useEffect, useState } from "react";
import { getServices } from "../services/api";

export default function useServices(filters = {}) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filtersKey = JSON.stringify(filters);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices(JSON.parse(filtersKey));
      setServices(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to load services"
      );
    } finally {
      setLoading(false);
    }
  }, [filtersKey]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
