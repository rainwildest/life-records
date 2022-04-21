import React from "react";
import { Icons } from "components";

type AmountTotalProps = {
  type?: "pay" | "income";
  amount?: string;
  total?: string;
};
const AmountTotal: React.FC<AmountTotalProps> = ({ type, amount, total }) => {
  return (
    <section className="px-5 pt-6">
      <div className="shadow-3 py-3 px-4 rounded-lg ">
        <div className="relative overflow-hidden flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <Icons name="statistics-01" className="svg-icon-36 pb-0.5" />
            <span className="pl-0.5 leading-6 font-bold text-lg">
              {type === "pay" && "支出统计"}
              {type === "income" && "收入统计"}
            </span>
          </div>
          <span className="text-xs text-gray-500 pl-1">共计 {total} 笔</span>
        </div>

        <div className="text-center">
          <div className="text-gray-800 font-bold truncate mt-5 mb-2">
            <span className="text-sm">￥</span>
            <span className="text-2xl">{amount}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmountTotal;
