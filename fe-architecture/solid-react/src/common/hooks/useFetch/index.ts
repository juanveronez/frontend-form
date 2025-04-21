import { useEffect, useState } from "react";
import Http from "../../lib/httpClient";

type FetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Http()
      .get<T>(url)
      .then(setData)
      .catch(() => setError("Erro ao carregar dados!"))
      .finally(() => setIsLoading(false));
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
