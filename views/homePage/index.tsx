import React, { memo, useState, useCallback } from "react";
import { Page, Link, Navbar, NavRight, Fab } from "framework7-react";
import Icons from "components/Icons";
import { useStatisticalDetailsQuery } from "apollo/graphql/model/statistics.graphql";
import CostCard from "components/CostCard";
import { relative } from "lib/api/dayjs";
const Home: React.FC = () => {
  // const { loading, data } = useSameDayQuery();
  const { loading, data, refetch } = useStatisticalDetailsQuery({
    // fetchPolicy: "no-cache"
  });
  const statistics = data?.statisticalDetails || {};

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <Page
      ptr
      onPtrRefresh={(done) => {
        setTimeout(() => {
          refetch();
          done();
        }, 2000);
      }}
    >
      <Navbar large transparent>
        <NavRight>
          <Link href="/bill/">
            <Icons name="bill" className="notepad-icon" />
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
          <CostCard
            key={detail.id}
            incomeTitle="今日收入"
            payTitle="今日支出"
            useMarginTop14={!index}
            type={detail.expense.expenseType}
            typeName={detail.expense.expenseName}
            time={relative(detail.purchaseTime)}
            amount={detail.expensePrice}
            remarks={detail.remarks}
          />
        ))}
      </div>

      <Fab
        position="right-bottom"
        slot="fixed"
        text=""
        color="white"
        href="/bookkeeping/"
      >
        <Icons name="notepad-01" className="row-span-1-2 col-span-1-2" />
      </Fab>
    </Page>
  );
};

export default memo(Home);
