import React, { useEffect, useState } from "react";
import { DEFAULT_USER_DATA } from "../../../utils/constans";
import { USERS_DUMMIES_DATA } from "../../../utils/dummies";

interface ComponentProps {
    title: string;
    dataURL: string;
    addText?: string;
    defaultData?: Record<string, string>[];
}

async function getData(URL: string) {
    const res = await fetch(URL);

    if (!res.ok) return [{}];

    const data = await res.json();
}

const ListFields: React.FC<ComponentProps> = ({
    title,
    dataURL,
    addText = "Tambah Data",
    defaultData = [{}],
}) => {
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const [listData, setListData] = useState(USERS_DUMMIES_DATA);

    useEffect(() => {
        if (popupActive) {
            // Get Lsit depending on given dateURL
        }
    }, [popupActive])

    return (
        <div>
            {popupActive && (
                <div className="fixed left-0 top-0 z-9999 h-screen w-full bg-black-2 bg-opacity-75">
                    <div className="absolute left-1/2 top-1/2 z-20 flex h-[500px] w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-y-4 bg-white px-4 py-4 lg:w-[1200px]">
                        <h3 className="font-semibold">{addText}</h3>
                        <div className="flex-1 border-[1.5px] border-gray-200 p-2">
                            {listData.map((data, key) => (
                                <button
                                    className="w-full rounded-md border-[1.5px] border-primary py-2 text-center font-medium text-primary hover:bg-primary hover:text-white"
                                    key={key}
                                >
                                    {data.name}
                                </button>
                            ))}
                        </div>
                        <button className="w-full rounded-md py-2 text-center font-medium bg-primary text-white">
                            Pilih Data
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {title}
                </label>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="size-6 stroke-black-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div className="border-[1.5px] border-gray-300 p-2">
                {defaultData?.map(
                    (data: Record<string, string>, index: number) => (
                        <button key={index}>{data.name}</button>
                    ),
                )}
                <button
                    onClick={() => setPopupActive(true)}
                    className="rounded-md bg-primary px-4 py-2 text-sm text-white"
                >
                    {addText}
                </button>
            </div>
        </div>
    );
};

export default ListFields;
