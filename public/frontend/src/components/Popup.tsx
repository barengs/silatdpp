import useFetch from "@/hooks/useFetch";
import { FormEvent, PropsWithChildren } from "react";
import { useStore } from "react-redux";
import { toast } from "react-toastify";

interface PopupPropsType extends PropsWithChildren {
    title: string;
    url: string;
    state: boolean;
    stateSetter: (state: boolean) => void;
}

const Popup: React.FC<PopupPropsType> = ({
    title,
    state,
    stateSetter,
    children,
}) => {
    const store = useStore();
    const authState = store.getState().auth;
    const [isPending, fetchCaller] = useFetch();

    const handleDataSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const res = await fetchCaller(url, {
            method: "put",
            headers: {
                Authorization: authState.token,
            },
            body: form,
        });

        if (!res.ok) {
            toast.error("Galat saat memperbarui data", {
                position: "top-right",
            });
            return;
        }

        toast.success("Berhasil memperbarui data", {
            position: "top-right",
        });
        stateSetter(false);
    };

    return (
        <div
            className={`${state || closed ? "fixed" : "hidden"} bottom-0 left-0 z-9999 flex min-h-screen w-full items-center justify-center`}
            onClick={() => console.log("Hello")}
        >
            {/* opacity clicker    */}
            <div
                className="absolute bottom-0 left-0 -z-10 min-h-screen w-full bg-black-2 bg-opacity-75"
                onClick={() => stateSetter(false)}
            ></div>
            {/* endopacity clicker */}

            <div className="w-max rounded-md bg-white p-4">
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
                    className="mt-8 grid grid-cols-2 gap-y-8"
                >
                    {children}
                    <div className="col-span-2 flex gap-x-4">
                        <button
                            className="flex w-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-sm"
                            type="submit"
                        >
                            {isPending ? (
                                <>
                                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Memperbarui Data
                                </>
                            ) : (
                                <>Perbarui </>
                            )}
                        </button>
                        <button
                            className="flex w-max justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90 text-sm"
                            onClick={() => stateSetter(false)}
                        >
                           Batalkan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;
