

import React from "react";
import { Milk, Package, GlassWater, Circle } from "lucide-react";
import type { ProductSubGroup } from "../types/product";

interface Props {
  groups: ProductSubGroup[];
  active: number | null;
  onSelect: (id: number | null) => void;
}

const getIcon = (name: string) => {
  const n = name.toLowerCase();

  if (n.includes("milk"))
    return (
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600 shrink-0">
        <Milk size={20} />
      </span>
    );

  if (n.includes("curd"))
    return (
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600 shrink-0">
        <Circle size={20} />
      </span>
    );

  if (n.includes("sambaram"))
    return (
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600 shrink-0">
        <GlassWater size={20} />
      </span>
    );

  return (
    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-600 shrink-0">
      <Package size={20} />
    </span>
  );
};

const ProductSubGroupFilter: React.FC<Props> = ({
  groups,
  active,
  onSelect,
}) => {
  return (
    <div className="w-full">
      {/* container unchanged */}
      <div
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide
                      md:grid md:grid-cols-4 md:gap-8 md:overflow-visible"
      >
        {/* ALL */}
        <button
          onClick={() => onSelect(null)}
          className={`flex flex-col items-center justify-center gap-1
          md:flex-row md:gap-3 md:whitespace-nowrap
          h-auto md:h-14 px-3 md:px-6 py-2 md:py-0
          rounded-2xl text-sm md:text-base font-semibold border transition
          min-w-[90px] md:min-w-[160px] cursor-pointer
          ${
            active === null
              ? "bg-[#0195db] text-white border-[#0195db] shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {getIcon("all")}
          <span className="text-center text-xs">All</span>
        </button>

        {groups.map((g) => (
          <button
            key={g.subgrp_gid}
            onClick={() => onSelect(g.subgrp_gid)}
            className={`flex flex-col items-center justify-center gap-1
            md:flex-row md:gap-3 md:whitespace-nowrap
            h-auto md:h-14 px-3 md:px-6 py-2 md:py-0
            rounded-2xl text-sm md:text-base font-semibold border transition
            min-w-[90px] md:min-w-[160px] cursor-pointer
            ${
              active === g.subgrp_gid
                ? "bg-[#0195db] text-white border-[#0195db] shadow-md"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {getIcon(g.subgrp_name)}
            <span className="text-center text-xs leading-tight">
              {g.subgrp_name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSubGroupFilter;
