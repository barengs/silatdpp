"use client"

import React, { useEffect, useState } from "react";

interface InputFieldsProps {
    title: string,
    name?: string,
    defaultValue?: string,
    error?: string
}

const TextFields = ({ title, defaultValue="", name="", error="" }: InputFieldsProps) => {

     const [errorMessege, setErrorMessege] = useState(error ? error : "");

     const handleError = (state) => {
        if (state) {
            setErrorMessege(error);
        } else {
            setErrorMessege(false);
        }
    };

      useEffect(() => {
             handleError(true);
         }, [error]);

    return (
        <div className="flex-1">

            <label className="mb-3 block text-sm font-medium text-black dark:text-white">{title}</label>


            <textarea
                placeholder={title}
                name={name}
                defaultValue={defaultValue}
                className={`w-full rounded-lg border-[1.5px] bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary  ${errorMessege ? "border-red-500" : "border-stroke "}`}
            ></textarea>
            {errorMessege && (
                <span className="mt-2 block text-sm text-red-500">{error}</span>
            )}
        </div>
    );
};

export default TextFields;
