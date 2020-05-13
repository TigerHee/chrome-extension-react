import React, { useEffect, useState } from "react";
import Axios from "axios";

export const useFetch = (url, type, config) => {
  const [refresh, setRefresh] = useState(null);
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const refresh = async () => {
      if (!url) {
        return;
      }
      if (isMounted) {
        setFetching(true);
      }
      const fetchFunction = type === "post" ? Axios.post : Axios.get;
      try {
        const result = await fetchFunction(url, config);
        // If fetching succeeds.
        if (result.status === 200 || result.status === 202) {
          if (isMounted) {
            setData(result.data);
          }
        } else {
          // If fetching fails
          if (isMounted) {
            setError(new Error(result.statusText));
          }
        }
      } catch (e) {
        if (isMounted) {
          setError(e);
        }
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };
    refresh();
    setRefresh(() => refresh);
    return () => {
      isMounted = false;
    };
  }, [url, type, config]);

  return {
    url,
    type,
    config,
    refresh,
    data,
    fetching,
    error,
  };
};
