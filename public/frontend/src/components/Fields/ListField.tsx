import React, { useEffect, useState } from "react";
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
    const [selectedData, setSelectedData] = useState<Record<string, string>[]>(
        [],
    );

    const addData = (newData: Record<string, string>) => {
        setSelectedData((state) => {
            if (state.some((data) => data.name == newData.name)) return state;

            state?.push(newData);
            return state;
        });
        // console.log(selectedData)
        setPopupActive(false);
    };

    useEffect(() => {
        if (popupActive) {
            // Get Lsit depending on given dateURL
        }
    }, [popupActive]);

    const handleOnRemove = (name: string) => {
        setSelectedData((state) => state.filter((data) => data.name != name));
    };

    return (
        <div>
            {popupActive && (
                <div className="fixed left-0 top-0 z-9999 h-screen w-full bg-black-2 bg-opacity-75">
                    <div className="absolute left-1/2 top-1/2 z-20 flex h-[500px] w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-y-4 bg-white px-4 py-4 lg:w-[1200px]">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{addText}</h3>
                            <button onClick={() => setPopupActive(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    className="size-5 stroke-black-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 border-[1.5px] border-gray-200 p-2">
                            {listData
                                .filter(
                                    (data) =>
                                        !selectedData.find(
                                            (subData) =>
                                                (data.name = subData.name),
                                        ),
                                )
                                .map((data, key) => (
                                    <button
                                        className="w-full rounded-md border-[1.5px] border-primary py-2 text-center font-medium text-primary hover:bg-primary hover:text-white"
                                        onClick={() => addData(data)}
                                        key={key}
                                    >
                                        {data.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Fields */}
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {title}
            </label>

            <div className="max-w-1/4 grid grid-cols-6 gap-4 border-[1.5px] border-gray-300 p-2">
                {selectedData?.map(
                    (data: Record<string, string>, index: number) => (
                        <div
                            key={index}
                            className="flex w-full items-center justify-between rounded-md border-[1.5px] border-black-2 px-2 py-2"
                        >
                            <p className="text-sm">{data.name}</p>
                            <button onClick={() => handleOnRemove(data.name)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    className="size-5 stroke-black-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ),
                )}
                <div className="col-span-6">
                    <button
                        onClick={() => setPopupActive(true)}
                        className="rounded-md bg-primary px-4 py-2 text-sm text-white"
                    >
                        {addText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListFields;
