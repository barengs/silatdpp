import Image from "next/image";
import React from "react";

export default function LetterHeading() {
    return (
        <header className="mb-8">
            <div className="flex items-center justify-center border-b-2 border-black pb-2 px-12 text-black-2">
                    <Image
                        src="/images/logo.png"
                        alt="logo dinas Pamekasan"
                        width={90}
                        height={90}
                    />
                <div className="flex-1 text-center">
                    <p className="text-[18px] font-bold">
                        PEMERINTAH KABUPATEN PAMEKASAN
                    </p>
                    <p className="text-[20px] font-bold">
                        DINAS PENDIDIKAN DAN KEBUDAYAAN
                    </p>
                    <p className="text-[14px]">JL Raya Proppo - Pamekasan</p>
                    <p className="text-[14px]">
                        Telp. (0324) 322 349 Fax. 322431
                    </p>
                </div>
            </div>
        </header>
    );
}
