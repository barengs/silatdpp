import { PropsWithChildren, useEffect, useState } from "react";


interface PopupPropsType extends PropsWithChildren {
    state?: boolean
}

const Popup: React.FC<PopupPropsType> = ({ state, children }) => {

    const [active, setActive] = useState(state ? false : true)

    useEffect(() => setActive(state!), [state])

    return (
        <div className={`${active ? 'fixed' : 'hidden'} bottom-0 left-0 z-9999 w-full min-h-screen bg-white`}>
            <div className="w-full p-4 flex justify-end">
                <button onClick={() => setActive(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="size-6 stroke-2 stroke-black-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>


            <form className="grid grid-cols-2">
                {children}
            </form>
        </div>
    );
};

export default Popup;
