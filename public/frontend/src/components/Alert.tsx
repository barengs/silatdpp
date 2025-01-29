import { useEffect, useState } from "react";

const Alert: React.FC = () => {

    const [visible, setVisible] = useState(true)


    useEffect(() => {
      const timeout = setTimeout(() => setVisible(false), 3000)

      return () => clearTimeout(timeout)
    }, [])

    if (!visible) return null

    return (
        <div className="flex w-[400px] gap-x-6 rounded-md border-l-6 border-[#34D399] bg-[#34D399] px-4 py-4 shadow-md dark:bg-[#1B1B24]">
            <div className="flex items-center justify-center rounded-lg bg-[#34D399]">
                <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                        fill="white"
                        stroke="white"
                    ></path>
                </svg>
            </div>
            <div className="w-full">
                <h5 className="font-medium text-white dark:text-[#45c145]">
                    Berhasil menambah data
                </h5>
            </div>
            <button onClick={() => setVisible(false)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Alert;
