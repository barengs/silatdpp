"use client"

import React, { ChangeEvent, useEffect, useState } from "react";

interface InputFieldsProps {
    title: string,
    onValueChange: (value: string) => void,
    name?: string,
    defaultValue?: string,
    autoCompleteData?: string[]
}

const InputFields = ({ title, autoCompleteData, onValueChange, defaultValue="", name="" }: InputFieldsProps) => {

    const [inputValue, setInputValue] = useState(defaultValue)
    const [data, setData] = useState<string[]>([])
    const [autoCompleteState, setAutoCompleteState] = useState(false)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.value) {
            setAutoCompleteState(true)
        } else {
            setAutoCompleteState(false)
        }

        setInputValue(event.target.value)
    }


    useEffect(() => onValueChange(inputValue), [inputValue])

    const handleButtonClick = (data: string) => {
        setAutoCompleteState(false)
        setInputValue(data)
    }


    useEffect(() => {
        setData(autoCompleteData)
    }, [autoCompleteData])


    const onBlurHandler = () => {
        const delay = setTimeout(() => setAutoCompleteState(false), 500)
        // clearTimeout(delay)
    }

    return (
        <div onBlur={onBlurHandler}>
            {(autoCompleteState || inputValue) &&

            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {title}
            </label>
            }
            <input
                type="text"
                placeholder={title}
                value={inputValue}
                onChange={handleInputChange}
                name={name}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <div className={`rounded-md bg-gray-100 w-full overflow-hidden py-2 mt-2 ${ (autoCompleteState && autoCompleteData) ? '' : 'hidden'}`}>
                {data?.filter(name => {
                    if (!name) return true
                    return name.toLowerCase().includes(inputValue.toLowerCase())
                }).map((data, index) => (
                    <button key={index} onClick={() => handleButtonClick(data)} className="hover:bg-blue-500 hover:text-white w-full">{data}</button>
                ))}
            </div>
        </div>
    );
};

export default InputFields;
