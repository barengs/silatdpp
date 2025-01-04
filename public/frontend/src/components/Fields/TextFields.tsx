"use client"

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

interface InputFieldsProps {
    title: string,
    onValueChange: (value: string) => void,
    name?: string,
    defaultValue?: string,
    autoCompleteData?: string[],
    onSelectAutoComplete?: (value: string) => void,
    addItemPath?: string
}

const TextFields = ({ title, autoCompleteData, onValueChange, addItemPath, onSelectAutoComplete, defaultValue="", name="" }: InputFieldsProps) => {

    const [inputValue, setInputValue] = useState(defaultValue)
    const [data, setData] = useState<string[]>([])
    const [autoCompleteState, setAutoCompleteState] = useState(false)


    const router = useRouter()

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

        if (event.target.value) {
            setAutoCompleteState(true)
        } else {
            setAutoCompleteState(false)
        }

        setInputValue(event.target.value)
    }


    useEffect(() => onValueChange(inputValue), [inputValue])
    useEffect(() => setInputValue(defaultValue), [defaultValue])

    const handleButtonClick = (name: string) => {
        setAutoCompleteState(false)
        setInputValue(name)

        if (!onSelectAutoComplete)  return
        onSelectAutoComplete(name)
    }


    useEffect(() => {
        setData(autoCompleteData)
    }, [autoCompleteData])


    const onBlurHandler = () => {
        setTimeout(() => setAutoCompleteState(false), 500)
    }

    return (
        <div className="flex-1" onBlur={onBlurHandler}>
            <textarea
                placeholder={title}
                value={inputValue}
                onChange={handleInputChange}
                name={name}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
            <div className={`rounded-md bg-gray-100 w-full overflow-hidden px-4 py-2 mt-2 flex flex-col gap-y-4 text-left ${ (autoCompleteState && autoCompleteData) ? '' : 'hidden'}`}>
                {data?.filter(name => {
                    if (!name) return true
                    return name.toLowerCase().includes(inputValue.toLowerCase())
                }).map((data, index) => (
                    <button key={index} onClick={() => handleButtonClick(data)} className="hover:bg-blue-500 hover:text-white w-full text-left">{data}</button>
                ))}
                <button onClick={() => router.push(addItemPath)} className="hover:bg-blue-500 hover:text-white w-full">+</button>
            </div>
        </div>
    );
};

export default TextFields;
