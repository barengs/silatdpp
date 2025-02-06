import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <div className="shrink-0 flex-nowrap overflow-hidden min-w-max">
      <ul className="mb-5.5 mt-4 flex flex-col gap-4 pl-4">
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                pathname.slice(0, -1) === item.route ? "text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarDropdown;
