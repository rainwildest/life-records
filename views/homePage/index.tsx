import React, { useEffect, useRef, useState, memo } from "react";
import { Page, Link, Navbar, NavRight, Fab } from "framework7-react";
import Icons from "components/Icons";
import { useSameDayQuery } from "apollo/graphql/model/same-day.graphql";

const Home: React.FC = () => {
  const { loading, data } = useSameDayQuery();
  const statistics = data?.sameDay || {};

  return (
    <Page>
      <Navbar large transparent>
        <NavRight>
          <Link href="/bookkeeping/">
            <Icons name="notepad-01" className="notepad-icon" />
          </Link>

          <div className="grid grid-cols-1 pl-4">
            <Icons
              name="moon"
              className="theme-moon row-span-1-2 col-span-1-2"
            />
            {/* <Icons name="sunlight" className="row-span-1-2 col-span-1-2" /> */}
          </div>
        </NavRight>
      </Navbar>

      {/* <div>
          <div className="font-color color-orange">
            <span className="text-xs font-semibold pr-2">今日支出</span>
            <span className="text-lg font-bold">￥200</span>
          </div>
          <div className="font-color color-gray mt-2">
            <span className="text-xs font-semibold pr-2">今日收入</span>
            <span className="text-lg font-bold">￥200</span>
          </div>

          <div className="mt-7">
            <Button outline round href="/bookkeeping/">
              记一下
            </Button>
          </div>
        </div> */}

      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
        <Icons name="cry" className="empty-icon" />
        <div className="font-color color-gray">
          今日还没任何记录呦，去<Link href="/bookkeeping/">记一笔</Link>
        </div>
      </div> */}

      <div className="pt-2 px-6 mb-10">
        <div className="shadow-3 p-4 rounded-lg text-xs text-right font-bold">
          <span>今日收入：{statistics.income || 0}</span>
          <span className="pl-4">今日支出：{statistics.pay || 0}</span>
        </div>

        {statistics.details?.map((detail, index) => (
          <div
            className={`${!index ? "mt-14" : "mt-8"} rounded-lg inset-shadow-3`}
            key={detail.id}
          >
            <div className="divide-k p-4 flex justify-between font-bold items-center">
              {detail.expense.expenseType === "incom" && (
                <div className="text-sm">今日收入</div>
              )}
              {detail.expense.expenseType === "pay" && (
                <div className="text-sm">今日支出</div>
              )}

              <div className="text-sm">{detail.purchaseTime}</div>
            </div>

            <div className="flex mt-4 px-4">
              <div className="w-1/2">类型：{detail.expense.expenseName}</div>
              <div className="w-1/2">费用：{detail.expensePrice}</div>
            </div>

            <div className="mt-4 px-4 pb-4">
              <div className="">备注</div>
              <div className="mt-1">{detail.remarks}</div>
            </div>
          </div>
        ))}
      </div>

      <Fab
        position="right-bottom"
        slot="fixed"
        text=""
        color="white"
        href="/bookkeeping/"
      >
        <Icons name="sunlight" className="row-span-1-2 col-span-1-2" />
      </Fab>
    </Page>
  );
};

export default memo(Home);
