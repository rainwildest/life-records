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

      <div className="pt-2 px-6" style={{ background: "none" }}>
        <wired-card fill="skyblue" elevation="3" class="w-full p-4">
          <div className="rounded-lg text-xs text-right font-bold">
            <span>今日收入：{statistics.income}</span>
            <span className="pl-4">今日支出：{statistics.pay}</span>
          </div>
        </wired-card>

        {statistics.details?.map((detail) => {
          return (
            <wired-card
              fill="skyblue"
              elevation="3"
              class="w-full mt-4 p-4"
              key={detail.id}
            >
              <div className="rounded-lg">
                <div className="flex justify-between font-bold">
                  <div className="self-end">今日收入</div>
                  <div className="text-xs self-end">{detail.purchaseTime}</div>
                </div>
                <div className="flex mt-4">
                  <div className="w-1/2">
                    类型：{detail.expense.expenseName}
                  </div>
                  <div className="w-1/2">费用：{detail.expensePrice}</div>
                </div>

                <div className="mt-4">
                  <div className="">备注</div>
                  <div className="mt-1">{detail.remarks}</div>
                </div>
              </div>
            </wired-card>
          );
        })}
      </div>

      {/* <wired-dialog open="false">
        <wired-calendar />
        <div className="text-right">
          <wired-button id="closeDialog">Close dialog</wired-button>
        </div>
      </wired-dialog> */}

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
