"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

interface InputFieldsProps {
  title: string;
  name?: string;
  defaultValue?: string;
  multiple?: boolean;
  type?: React.HTMLInputTypeAttribute;
  autoCompleteData?: string[];
  addItemPath?: string;
}

const InputFields: React.FC<InputFieldsProps> = ({
  title,
  autoCompleteData = [],
  addItemPath = "",
  defaultValue = "",
  type = "text",
  multiple = false,
  name = "",
}) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [data, setData] = useState<string[]>([]);
  const [autoCompleteState, setAutoCompleteState] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    setAutoCompleteState(!!value);
  };

  const handleButtonClick = (value: string) => {
    setInputValue(value);
    setAutoCompleteState(false);
  };

  const onBlurHandler = () => {
    setTimeout(() => setAutoCompleteState(false), 200);
  };

  // Hooks

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setData(autoCompleteData || []);
  }, []);



  return (
    <div className="flex-1" onBlur={onBlurHandler}>
      {(autoCompleteState || inputValue || type === "date") && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {title}
        </label>
      )}
      <input
        type={type}
        placeholder={title}
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        multiple={multiple}
        autoComplete={autoCompleteData ? "off" : ""}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <div
        className={`rounded-md bg-gray-100 w-full overflow-hidden px-4 py-2 mt-2 flex flex-col gap-y-4 text-left ${
          autoCompleteState && data.length ? "" : "hidden"
        }`}
      >
        {data
          ?.filter((item) => {
            if (!item) return false;
            return item.toLowerCase().includes(inputValue.toLowerCase());
          })
          .map((item, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(item)}
              className="hover:bg-blue-500 hover:text-white w-full text-left"
              type="button"
            >
              {item}
            </button>
          ))}
        {addItemPath && (
          <button
            type="button"
            onClick={() => router.push(addItemPath)}
            className="hover:bg-blue-500 hover:text-white w-full"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default InputFields;
