import { FormEvent, useState } from "react";
import { formatBytes } from "./utils/formatBytes";

const inputRe = /^\d+$/;
export const App = () => {
  const [value, setValue] = useState("520");
  const inputHandler = (e: FormEvent) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (inputValue && !inputRe.test(inputValue)) {
      e.preventDefault();
      return;
    }
    setValue(inputValue);
  };

  return (
    <>
      <input value={value} onInput={inputHandler} placeholder="Type numbers" />
      &nbsp;
      <span>{formatBytes(value)}</span>
    </>
  );
};
