import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const bind = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  const reset = () => {
    setValue(initialValue);
  };

  const update = (newValue)=>{
    setValue(newValue)
  }

  return [value, bind, reset, update];
}

export default useInput;