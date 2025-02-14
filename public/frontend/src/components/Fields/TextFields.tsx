"use client"

import React, { ChangeEvent, useEffect, useState } from "react";

interface InputFieldsProps {
    title: string,
    name?: string,
    defaultValue?: string,
}

const TextFields = ({ title, defaultValue="", name="" }: InputFieldsProps) => {

    return (
        <div className="flex-1">

            <label className="mb-3 block text-sm font-medium text-black dark:text-white">{title}</label>


            <textarea
                placeholder={title}
                name={name}
                defaultValue={defaultValue}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
        </div>
    );
};

export default TextFields;
