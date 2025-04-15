import { FormEvent, PropsWithChildren, ReactNode, useState } from "react";
import { toast } from "react-toastify";


type immutableDataType = {
    name: string;
    value: string
}

interface PopupPropsType extends PropsWithChildren {
    title: string;
    idItem: string;
    state: boolean;
    stateSetter: (state: boolean) => void;
    mutation?: unknown;
    isLoading?: boolean;
    expanded?: boolean;
    buttons: ReactNode[];
    immutableData?: immutableDataType[];
}

const CustomModal: React.FC<PopupPropsType> = ({
    title,
    state,
    stateSetter,
    idItem,
    children,
    buttons,
    mutation = null,
    isLoading = false,
    expanded = false,
    immutableData = [{ name: "", value: ""}]
}) => {


    return (
        <div
            className={`${state || closed ? "fixed" : "hidden"} bottom-0 left-0 z-9999 flex min-h-screen w-full items-end`}
        >
            <div
                className="absolute bottom-0 left-0 -z-10 min-h-screen w-full bg-black-2 bg-opacity-75"
                onClick={() => stateSetter(false)}
            ></div>

            <div className="w-full max-h-[80vh] rounded-t-md bg-white p-4 overflow-y-auto">
                <div className="flex w-full justify-between">
                    <h2 className="font-semibold text-black-2">{title}</h2>
                    <button onClick={() => stateSetter(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            className="size-6 stroke-black-2 stroke-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    className="mt-8 flex flex-col md:grid md:grid-cols-2 gap-x-4 gap-y-8"
                >
                    {children}
                    <div className="col-span-2 flex gap-x-4">
                        {buttons.map((button) => button)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
