import React from "react";

type CostCardOptions = {
  useMarginTop14: boolean;
  type: string;
  time?: string;
  typeName: string;
  amount: number;
  remarks: string;
  incomeTitle: string;
  payTitle: string;
};

const CostCard: React.FC<CostCardOptions> = ({
  useMarginTop14 = false,
  type,
  time,
  typeName,
  amount,
  remarks,
  incomeTitle,
  payTitle
}) => {
  return (
    <div className={`${useMarginTop14 ? "mt-14" : "mt-8"} rounded-lg shadow-3`}>
      <div className="divide-gray p-4 flex justify-between font-bold items-center">
        {type === "income" && <div className="text-sm">{incomeTitle}</div>}
        {type === "pay" && <div className="text-sm">{payTitle}</div>}

        <div className="text-sm">{time}</div>
      </div>

      <div className="flex mt-4 px-4 text-sm">
        <div className="w-1/2">类型：{typeName}</div>
        <div className="w-1/2">费用：{amount}</div>
      </div>

      <div className="mt-4 px-4 pb-4 text-sm flex">
        <div className="flex-shrink-0">备注：</div>
        <div className="line-clamp-2 break-words">{remarks}</div>
      </div>
    </div>
  );
};

export default CostCard;
