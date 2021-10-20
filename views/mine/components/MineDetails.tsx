import React, { memo, Fragment } from "react";
import { BlockHeader } from "framework7-react";
import Icons from "components/Icons";

const MineDetails: React.FC = () => {
  return (
    <Fragment>
      <div className="mine-bg-color flex flex-col items-center p-16 mx-3 rounded-3xl mt-3 shadow-3">
        <div className="mine-avatar w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <Icons name="moon" />
        </div>

        <section className="text-center mt-3">
          <div className="text-xl font-bold">rainwildest</div>
          <div className="text-sm font-medium">rainwildest@163.com</div>
        </section>
      </div>

      <BlockHeader className="mt-7 font-bold">收入统计</BlockHeader>
      <div className="mine-container p-2 mx-3 rounded-lg grid grid-cols-3 gap-2 mt-1 shadow-3">
        <section
          className="rounded px-1 py-3 block my-0 text-center font-bold text-xs text-white leading-loose shadow-2"
          style={{
            color: "#B91C1C"
          }}
        >
          <div className="leading-none">当天收入</div>
          <div className="truncate leading-none mt-2">+2000000000000000000</div>
        </section>

        <section
          className="rounded px-1 py-3 block my-0 text-center font-bold text-xs text-white leading-loose shadow-2"
          style={{
            color: "#B91C1C"
          }}
        >
          <div className="leading-none">当月收入</div>
          <div className="truncate leading-none mt-2">+2000000000</div>
        </section>
        <section
          className="rounded px-1 py-2 block my-0 text-center font-bold text-xs text-white leading-loose shadow-2"
          style={{
            color: "#B91C1C"
          }}
        >
          <div className="leading-none">今年收入</div>
          <div className="truncate leading-none mt-2">+2000000000</div>
        </section>
      </div>

      <BlockHeader className="mt-7 font-bold">支出统计</BlockHeader>
      <div className="mine-container p-2 mx-3 mb-10 rounded-lg grid grid-cols-3 gap-2 mt-1 shadow-3">
        <section
          className="rounded px-1 py-3 block my-0 text-center font-bold text-xs text-white leading-loose shadow-2"
          style={{
            color: "#10B981"
          }}
        >
          <div className="leading-none">当天支出</div>
          <div className="truncate leading-none mt-2">-20</div>
        </section>

        <section
          className="rounded px-1 py-3 block my-0 text-center font-bold text-xs text-white leading-loose shadow-2"
          style={{
            color: "#10B981"
          }}
        >
          <div className="leading-none">当月支出</div>
          <div className="truncate leading-none mt-2">-20</div>
        </section>
        <section
          className="rounded px-1 py-3 block my-0 text-center font-bold text-xs text-white leading-loose shadow-2"
          style={{
            color: "#10B981"
          }}
        >
          <div className="leading-none">今年支出</div>
          <div className="truncate leading-none mt-2">-20</div>
        </section>
      </div>
    </Fragment>
  );
};

export default memo(MineDetails);
