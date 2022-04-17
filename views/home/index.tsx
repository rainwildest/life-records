import React, { memo, useState, useCallback } from "react";
import { Page, PageContent, Link, Navbar, NavRight, Fab, useStore } from "framework7-react";
import { useDetailsQuery } from "graphql/model/statistics.graphql";
import { Amounts, Icons, CostCard, NotloggedIn, ThemeIcon, Echarts } from "components";
import { relative, getCurrentDate } from "lib/apis/dayjs";
import { thousands } from "lib/apis/utils";

const Home: React.FC = () => {
  const token = useStore("token");

  const [costType, setCostType] = useState<string>("pay");

  const { data, refetch } = useDetailsQuery({ variables: { date: getCurrentDate("YYYY-MM"), type: costType } });
  const statistics = data?.statisticalDetails || {};

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const onSetCostType = (e: any) => {
    const target = e.target as HTMLDivElement;
    const type = target.getAttribute("data-type");

    setCostType(type);
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
          <div className="px-6">
            {/* <Amounts
              incomTitle="今日收入"
              payTitle="今日支出"
              income={thousands(statistics.income)}
              pay={thousands(statistics.pay)}
            /> */}
            {/* <div className="shadow-3 rounded-lg p-3 mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Icons name="amounts" className="svg-icon-28 pr-1.5" />
                  <p className="text-base font-semibold">概括统计</p>
                </div>
              </div>

              <div></div>
            </div> */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-2xl pr-0.5">四月</span>
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
            </div>

            <div className="shadow-3 rounded-lg py-3 mt-10">
              <div className="flex justify-between px-5">
                <div>
                  <span className="font-medium">{costType === "pay" ? "我的支出" : "我的收入"}</span>
                  <span className="text-xs text-gray-500 pl-1">共计 222 笔</span>
                </div>

                <div>
                  <span className="text-xs font-medium">￥</span>
                  <span className="text-xl font-medium">3333</span>
                </div>
              </div>

              {/* <div className="text-gray-500 text-sm px-5 mt-6">支出对比（元）</div> */}
              <Echarts
                className="px-5 py-3 mt-6"
                style={{ height: "12rem" }}
                option={{
                  xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                  },
                  yAxis: {
                    type: "value"
                  },
                  grid: {
                    left: "0%",
                    right: "2%",
                    bottom: "0%",
                    top: "3%",
                    containLabel: true
                  },
                  series: [
                    {
                      data: [150, 230, 224, 218, 135, 147, 260],
                      type: "line"
                    }
                  ]
                }}
              />
            </div>

            {statistics.details?.map((detail, index) => (
              <CostCard
                key={detail.id}
                type={detail.expense.expenseType}
                typeName={detail.expense.expenseName}
                time={relative(detail.purchaseTime)}
                amounts={thousands(detail.amounts)}
                remarks={detail.remarks}
                className="mt-6"
              />
            ))}
          </div>
        )}
      </PageContent>
      {!token && <NotloggedIn />}

      <Fab position="right-bottom" slot="fixed" text="" color="white" href="/book-keeping">
        <Icons name="notepad-01" className="row-span-1-2 col-span-1-2" />
      </Fab>
    </Page>
  );
};

export default memo(Home);
