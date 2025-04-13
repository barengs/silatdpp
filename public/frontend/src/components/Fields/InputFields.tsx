"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

interface InputFieldsProps {
    title: string;
    name?: string;
    defaultValue?: string;
    multiple?: boolean;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    autoCompleteData?: string[];
    onSelectedAutoComplete?: (value: string) => void;
    addItemPath?: string;
    error?: string;
}

const InputFields: React.FC<InputFieldsProps> = ({
    title,
    autoCompleteData = [],
    onSelectedAutoComplete = (value: string) => undefined,
    addItemPath = "",
    defaultValue = "",
    type = "text",
    multiple = false,
    disabled = false,
    name = "",
    error = "",
}) => {
    const router = useRouter();

    const [inputValue, setInputValue] = useState<string>(defaultValue);
    const [data, setData] = useState<string[]>(autoCompleteData);
    const [autoCompleteState, setAutoCompleteState] = useState<boolean>(false);
    const [errorMessege, setErrorMessege] = useState(error ? error : "");
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setInputValue(value);
        setAutoCompleteState(!!value);
    };

    const handleButtonClick = (value: string) => {
        setInputValue(value);
        setAutoCompleteState(false);
        onSelectedAutoComplete(value);
    };

    const onBlurHandler = () => {
        setTimeout(() => setAutoCompleteState(false), 200);
    };

    const handleShowPassword = () => {
        if (type == "password") {
            if (showPassword) {
                return "text"
            } else {
                return "password"
            }
        }

        return type
    }

    const handleError = (state) => {
        if (state) {
            setErrorMessege(error);
        } else {
            setErrorMessege(false);
        }
    };

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        handleError(true);
    }, [error]);

    useEffect(() => {
        if (JSON.stringify(data) !== JSON.stringify(autoCompleteData)) {
            setData(autoCompleteData);
        }
    }, [autoCompleteData]);

    return (
        <div className="flex-1" onBlur={onBlurHandler}>
            <label
                className={`mb-3 block text-sm font-medium dark:text-white ${errorMessege ? "text-red-500" : "text-black"}`}
            >
                {title}
            </label>
            <div className="flex w-full items-center rounded-lg border-[1.5px] bg-transparent p-1.5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <input
                    type={handleShowPassword()}
                    placeholder={title}
                    value={inputValue}
                    onChange={handleInputChange}
                    name={name}
                    multiple={multiple}
                    autoComplete={autoCompleteData ? "off" : ""}
                    disabled={disabled}
                    onFocus={() => handleError(false)}
                    className={`flex-1 outline-none bg-transparent border-none ${errorMessege ? "border-red-500" : "border-stroke "}`}
                />
                {type == "password" &&
                <button type="button" onClick={() => setShowPassword(state => !state)}>

                
                   { (showPassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                    ))}
                    </button>
                    }
                    
            </div>

            {errorMessege && (
                <span className="mt-2 block text-sm text-red-500">{error}</span>
            )}
            <div
                className={`mt-2 flex w-full flex-col gap-y-4 overflow-hidden rounded-md bg-gray-100 px-4 py-2 text-left ${
                    autoCompleteState && data.length ? "" : "hidden"
                }`}
            >
                {data
                    ?.filter((item) => {
                        if (!item) return false;
                        return item
                            .toLowerCase()
                            .includes(inputValue.toLowerCase());
                    })
                    .map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(item)}
                            className="w-full text-left hover:bg-blue-500 hover:text-white"
                            type="button"
                        >
                            {item}
                        </button>
                    ))}
                {addItemPath && (
                    <button
                        type="button"
                        onClick={() => router.push(addItemPath)}
                        className="w-full hover:bg-blue-500 hover:text-white"
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputFields;
