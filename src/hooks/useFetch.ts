import { useEffect, useState } from "react";

export const useFetch = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    if (!endpoint) return;
    let isMounted = true;

    const get = async () => {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const { data } = await res.json();

      if (isMounted) {
        setResponse(data);
        setIsLoading(false);
      }
    };
  });
};
