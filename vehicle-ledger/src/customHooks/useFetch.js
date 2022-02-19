import react, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [value, setvalue] = useState();

  useEffect(() => {
    const fetchData = async (url) => {
      let data = await fetch(url);
      let jsonData = await data.json();
      setvalue(jsonData);
    };

    fetchData(url);
  }, [url]);

  return { response: value };
};

export default useFetch;
