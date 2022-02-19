import React, { useState } from "react";

const useInput = (initialValue) => {
  const [value, setvalue] = useState(initialValue);

  return {
    value,
    onChange: (event) => {
      setvalue(event.target.value);
    },
  };
};

export default useInput;
