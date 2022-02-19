import React, { useEffect, useState } from "react";

const usePostFetch = (url, payload) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  useEffect(() => {
    const postData = async (url) => {
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setResponse(data);
      } catch (err) {
        setError(err);
      }
    };

    postData(url);
  }, [url]);

  return { response, error };
};

export default usePostFetch;
