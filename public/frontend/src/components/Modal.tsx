import { FormEvent, PropsWithChildren, useState } from "react";
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
    ableUpdate?: boolean;
    ableDelete?: boolean;
    mutation?: unknown;
    isLoading?: boolean;
    expanded?: boolean;
    immutableData?: immutableDataType[];
}

const Modal: React.FC<PopupPropsType> = ({
    title,
    state,
    stateSetter,
    idItem,
    children,
    ableUpdate = false,
    ableDelete = false,
    mutation = null,
    isLoading = false,
    expanded = false,
    immutableData = [{ name: "", value: ""}]
}) => {
    const [method, setMethod] = useState("update");

    const handleDataSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget)

        immutableData.map(data => form.append(data.name, data.value))

        const res = await mutation({idItem, form})

        console.log(res)


        if (!res.data.success) {
            toast.error("Galat saat memperbarui data", {
                position: "top-right",
            });
            return;
        }

        toast.success(`Berhasil ${method == "update" ? "Memperbarui" : "Menghapus"} data`, {
            position: "top-right",
        });
        stateSetter(false);
        
    };

    return (
        <div
            className={`${state || closed ? "fixed" : "hidden"} bottom-0 left-0 z-9999 flex min-h-screen w-full items-end`}
        >
            <div
                className="absolute bottom-0 left-0 -z-10 min-h-screen w-full bg-black-2 bg-opacity-75"
                onClick={() => stateSetter(false)}
            ></div>

            <div className="w-full max-h-[80vh] overflow-y-scroll rounded-t-md bg-white p-4 overflow-y-auto">
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

                <form
                    onSubmit={handleDataSubmit}
                    className="mt-8 flex flex-col md:grid md:grid-cols-2 gap-x-4 gap-y-8"
                >
                    {children}
                    <div className="col-span-2 flex gap-x-4">
                        {ableUpdate && (
                            <button
                                className="flex w-max justify-center rounded bg-primary p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={() => setMethod("update")}
                            >
                                {isLoading && method == "update" ? (
                                    <>
                                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Memperbarui Data
                                    </>
                                ) : (
                                    <>Perbarui </>
                                )}
                            </button>
                        )}
                        {ableDelete && (
                            <button
                                className="flex w-max justify-center rounded bg-red-500 p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={() => setMethod("delete")}
                            >
                                {isLoading && method == "delete" ? (
                                    <>
                                        <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Menghapus Data
                                    </>
                                ) : (
                                    <>Hapus </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
