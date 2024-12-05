import React from "react";

interface InputFieldsProps {
    name: string,
    placeholder?: string,
    defaultValue?: string
}

const InputFields = ({ name, placeholder=name, defaultValue }: InputFieldsProps) => {
    return (
        <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {name}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={defaultValue}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
        </div>
    );
};

export default InputFields;
