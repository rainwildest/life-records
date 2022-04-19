import React, { memo, useState, useCallback } from "react";
import { Page, PageContent, Link, Navbar, NavRight, Fab, useStore } from "framework7-react";
import { useGetCostTotalDetailsQuery } from "graphql/model/statistics.graphql";
import { Amounts, Icons, CostCard, NotloggedIn, ThemeIcon } from "components";
import { relative, getCurrentDate, getDaysInMonth } from "lib/apis/dayjs";
import { thousands } from "lib/apis/utils";
import { Income, Expenditure, PaymentAnalysis } from "./components";

type AmountType = { pay: string; income: string };
const Home: React.FC = () => {
  const token = useStore("token");

  const [costType, setCostType] = useState<keyof AmountType>("pay");

  const fields = {
    date: getCurrentDate("YYYY-MM"),
    type: costType
  };
  const { data, refetch } = useGetCostTotalDetailsQuery({
    variables: {
      input: {
        ...fields,
        groupFormat: "MM"
      },
      details: {
        ...fields,
        groupFormat: "MM-DD"
      }
    },
    fetchPolicy: "network-only"
  });

  const statistics = data?.statisticalCostDetails || {};

  const days = new Array(getDaysInMonth()).fill(0);
  statistics?.totalDetails?.map((item) => {
    const day = item.purchaseTime.split("-")[1];
    const index = parseInt(day) - 1;
    days[index] = item.amounts;
  });

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const onSetCostType = (e: any) => {
    const target = e.target as HTMLDivElement;
    const type = target.getAttribute("data-type");

    setCostType(type as keyof AmountType);
  };

  const contrast = {
    "01": "一月",
    "02": "二月",
    "03": "三月",
    "04": "四月",
    "05": "五月",
    "06": "六月",
    "07": "七月",
    "08": "八月",
    "09": "九月",
    "10": "十月",
    "11": "十一月",
    "12": "十二月"
  };

  return (
    <Page pageContent={false}>
      <Navbar noHairline large transparent>
        <NavRight>
          <Link href="/bill">
            <Icons name="bill" className="notepad-icon" />
          </Link>

          <ThemeIcon />
        </NavRight>
      </Navbar>
      <PageContent
        ptr
        onPtrRefresh={(done) => {
          if (!token) return done();
          setTimeout(() => {
            refetch();
            forceUpdate();
            done();
          }, 500);
        }}
      >
        {!!token && (
          <div className="px-6 pb-8">
            {/* <Amounts
              incomTitle="今日收入"
              payTitle="今日支出"
              income={thousands(statistics.income)}
              pay={thousands(statistics.pay)}
            /> */}

            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-2xl pr-0.5">{contrast[getCurrentDate("MM")]}</span>
                <span className="font-medium text-lg">概括统计</span>
              </div>
              <div className="flex">
                <div
                  data-type="pay"
                  className={`${costType === "pay" ? "shadow-inset-2" : "shadow-3"} rounded-md px-4 py-1 text-xs mr-4`}
                  onClick={onSetCostType}
                >
                  支付
                </div>
                <div
                  data-type="income"
                  className={`${costType === "income" ? "shadow-inset-2" : "shadow-3"} rounded-md px-4 py-1 text-xs`}
                  onClick={onSetCostType}
                >
                  收入
                </div>
              </div>
            </div>

            <div className="shadow-3 rounded-lg py-3 mt-10">
              <div className="flex justify-between px-5 h-7">
                <div>
                  <div className="inline-block font-medium text-base">{costType === "pay" ? "我的支出" : "我的收入"}</div>
                  <span className="text-xs text-gray-500 pl-1">共计 {statistics?.total || 0} 笔</span>
                </div>

                <div>
                  <span className="text-xs font-medium">￥</span>
                  <span className="text-xl font-medium">
                    {costType === "pay" && thousands(statistics.pay || 0)}
                    {costType === "income" && thousands(statistics.income || 0)}
                  </span>
                </div>
              </div>

              {/* <div className="text-gray-500 text-sm px-5 mt-6">支出对比（元）</div> */}
              <PaymentAnalysis days={days} type={costType} />
            </div>

            {costType === "pay" && <Expenditure />}
            {costType === "income" && <Income />}

            {/* {statistics.?.map((detail, index) => (
              <CostCard
                key={detail.id}
                type={detail.expense.expenseType}
                typeName={detail.expense.expenseName}
                time={relative(detail.purchaseTime)}
                amounts={thousands(detail.amounts)}
                remarks={detail.remarks}
                className="mt-6"
              />
            ))} */}
          </div>
        )}
      </PageContent>
      {!token && <NotloggedIn />}

      {/* <Fab position="right-bottom" slot="fixed" text="" color="white" href="/book-keeping">
        <Icons name="notepad-01" className="row-span-1-2 col-span-1-2" />
      </Fab> */}
    </Page>
  );
};

export default memo(Home);
