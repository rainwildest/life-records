import React from "react";
import { Page, Link, Button } from "framework7-react";
import Icons from "views/Icons";

const Home: React.FC = () => {
  return (
    <Page>
      <div
        className="w-full flex justify-end items-center fixed top-0 right-0 px-5 py-3"
        style={{
          backdropFilter: "blur(10px)"
          // background: "rgba(255,255,255, 0.8)"
        }}
      >
        <Link href="/bookkeeping/">
          <Icons name="notepad-01" className="notepad-icon" />
        </Link>

        <div className="grid grid-cols-1 pl-4">
          <Icons name="moon" className="theme-moon row-span-1-2 col-span-1-2" />
          <Icons
            name="sunlight"
            className="theme-sunlight row-span-1-2 col-span-1-2"
          />
        </div>
      </div>

      {/* <div>
          <div className="expenditure-today color-orange">
            <span className="text-xs font-semibold pr-2">今日支出</span>
            <span className="text-lg font-bold">￥200</span>
          </div>
          <div className="income-today color-gray mt-2">
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
          <div className="empty-text color-gray">
            今日还没任何记录呦，去<Link href="/bookkeeping/">记一笔</Link>
          </div>
        </div> */}
      <div
        className="pt-20 px-6"
        style={{ height: "1000px", background: "none" }}
      >
        <div
          className="white rounded-lg p-4 text-right"
          style={{ background: "white" }}
        >
          <span>今日收入：200</span>
          <span className="pl-4">今日支出：200</span>
        </div>

        <div className="mt-4 rounded-lg p-4" style={{ background: "white" }}>
          <div className="flex justify-between">
            <div>今日收入</div>
            <div>2021-09-10 15:30:29</div>
          </div>
          <div className="flex mt-4">
            <div className="w-1/2">类型：日用</div>
            <div className="w-1/2">费用：200</div>
          </div>

          <div className="mt-4">
            <div className="">备注</div>
            <div className="mt-1">jslfjslkjfdsfd</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
