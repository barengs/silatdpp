import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type FILE_PROTOTYPE_TYPE = {
    name: string;
    size: number;
    type: string;
    lastModified: number;
};

interface ComponentProps {
    title: string;
    setter: (value: FILE_PROTOTYPE_TYPE[]) => void;
    multiple?: boolean;
    error?: string;
}

const FilesFields: React.FC<ComponentProps> = ({
    title,
    setter,
    multiple = true,
    error = "",
}) => {
    const [fieldActive, setFieldActive] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);
    const [_, setForceUpdate] = useState<boolean>(false);

    const [errorMessege, setErrorMessege] = useState(error);

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (fieldActive) return;

        event.preventDefault();
        setFieldActive(true);
    };

    const handleSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;

        if (selectedFiles?.length <= 0) return;

        setFiles(Array.from(selectedFiles));
    };

    const handleFileDropped = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setFiles(Array.from(event.dataTransfer.files));

        setFieldActive(false);
    };

    const handleFileRemove = (index: number) => {
        setFiles((prevFile) => {
            prevFile.splice(index, 1);
            return prevFile;
        });
        setForceUpdate((state) => !state);
    };

    const onChooseFile = () => {
        fileRef.current?.click();
    };

    useEffect(() => {
        setter(files);
        setFieldActive(false);
    }, [files]);

    const handleError = (state) => {
        if (state) {
            setErrorMessege(error);
        } else {
            setErrorMessege(false);
        }
    };

    useEffect(() => handleError(true), [error]);

    return (
        <>
            {/* hover */}
            {fieldActive && (
                <div className="fixed left-0 top-0 z-9999 w-full">
                    <div className="relative min-h-screen w-full">
                        <div
                            onClick={() => setFieldActive(false)}
                            className="absolute left-0 top-0 h-full w-full bg-black-2 bg-opacity-80"
                        ></div>

                        <div className="absolute left-1/2 top-1/2 z-20 flex h-[500px] w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-y-4 bg-white px-4 py-4 lg:w-[1200px]">
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg font-semibold text-black-2">
                                    Upload Bukti
                                </h1>

                                <button
                                    type="button"
                                    onClick={() => setFieldActive(false)}
                                >
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
                            <div
                                onDrop={handleFileDropped}
                                onDragOver={(
                                    event: React.DragEvent<HTMLInputElement>,
                                ) => event.preventDefault()}
                                className="flex flex-1 flex-col items-center justify-center border-2 border-dashed"
                            >
                                <p>Tarik dan letakkan disini</p>
                                <button
                                    type="button"
                                    onClick={onChooseFile}
                                    className="mt-4 rounded-md bg-primary p-2 text-sm font-medium text-white"
                                >
                                    Pilih File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* endhover */}

            <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {title}
                </label>
                {files?.length <= 0 ? (
                    <>
                        <input
                            onClick={handleClick}
                            onChange={handleSelected}
                            onFocus={() => handleError(false)}
                            ref={fileRef}
                            type="file"
                            multiple={multiple}
                            className={`w-full rounded-lg border-[1.5px] bg-transparent p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary  ${errorMessege ? "border-red-500" : "border-stroke"}`}
                        />
                        {errorMessege && (
                            <span className="mt-2 block text-sm text-red-500">
                                {error}
                            </span>
                        )}
                    </>
                ) : (
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex w-full items-center justify-between rounded-md border-[1.5px] border-black-2 px-2 py-2"
                            >
                                <a
                                    target="_blank"
                                    href={URL.createObjectURL(file)}
                                    className="text-sm hover:underline"
                                >
                                    {file.name}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => handleFileRemove(index)}
                                >
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
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default FilesFields;
