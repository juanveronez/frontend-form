import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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
    axios
      .get(url)
      .then(({ data }: AxiosResponse<T>) => setData(data))
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
