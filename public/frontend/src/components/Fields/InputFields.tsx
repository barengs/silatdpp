"use client"

import React, { ChangeEvent, useEffect, useState } from "react";

interface InputFieldsProps {
    title: string,
    name?: string,
    placeholder?: string,
    defaultValue?: string,
    autoCompleteData?: string[]
}

const InputFields = ({ title, defaultValue="", name="", autoCompleteData=[], placeholder=name }: InputFieldsProps) => {

    const [inputValue, setInputValue] = useState(defaultValue)
    const [data, setData] = useState(autoCompleteData)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.toLowerCase())
    }


    // useEffect(() => {
        
    //     if (!inputValue) return
        
    //     const res = data?.filter(name => {
    //         return name.toLowerCase().includes(inputValue)

    //     })

    //     setData(res)
    // }, [inputValue])

    return (
        <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {title}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                name={name}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <div className={`rounded-md bg-gray-100 w-full overflow-hidden py-2 mt-2 ${ autoCompleteData ? '' : 'hidden'}`}>
                {data?.filter(name => {
                    if (!name) return true
                    return name.toLowerCase().includes(inputValue)
                }).map((data, index) => (
                    <button key={index} onClick={() => setInputValue(data)} className="hover:bg-blue-500 hover:text-white w-full">{data}</button>
                ))}
            </div>
        </div>
    );
};

export default InputFields;
