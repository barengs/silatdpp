import { useState } from "react";

interface Props {
    data: { name: string; desc: string; }[];
    filledAt: number
}

const ProgressLine = ({ data, filledAt }: Props) => {
    return (
        <div className="flex flex-col justify-start lg:items-center lg:h-max lg:min-w-[500px] lg:flex-row gap-4">
            {data.map((item, index) => (
                <div key={index}>
                {index > 0 &&
                
                <div className={`h-[200px] w-[5px] lg:h-[5px] lg:w-[200px] ${filledAt >= index + 1 ? 'bg-green-500' : 'bg-gray-300'} rounded-md`}></div>
                }

                <div className="flex-1 flex flex-row md:flex-col md:justify-start items-center gap-x-4 space-y-0 lg:space-y-2">
                    <div className={`flex size-[40px] items-center justify-center rounded-full ${filledAt >= index + 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <p className="text-sm text-white">{index + 1}</p>
                    </div>
                    <div className="space-y-1 text-left md:text-center">
                        <h3 className="font-medium">Pengajuan</h3>
                        <p className="text-sm text-black">31 Desember 2024</p>
                    </div>
                </div>                
                </div>
            ))}
        </div>
    );
};

export default ProgressLine;
