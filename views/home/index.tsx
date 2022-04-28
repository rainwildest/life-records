import React, { memo, useState, useEffect } from "react";
import { Page, PageContent, Link, Navbar, NavRight, useStore } from "framework7-react";
import {
  useGetCostTotalDetailsQuery,
  useGetClassifiedStatisticsQuery,
  useGetStatisticalBudgetQuery
} from "graphql/model/statistics.graphql";
import { Icons, NotloggedIn, ThemeIcon, BudgetContainer, ClassificationContainer } from "components";
import { getCurrentDate, getDaysInMonth } from "lib/apis/dayjs";
import { thousands } from "lib/apis/utils";
import { PaymentAnalysis } from "./components";

const Home: React.FC = () => {
  const token = useStore("token");

  const [costType, setCostType] = useState<keyof AmountType>("pay");

  const { data: classifiedData, refetch: classifiedRefetch } = useGetClassifiedStatisticsQuery({
    variables: { date: getCurrentDate("YYYY-MM"), type: token && costType },
    fetchPolicy: "network-only"
  });

  const fields = {
    date: getCurrentDate("YYYY-MM"),
    type: token && costType
  };

  const { data: totalData, refetch: totalRefetch } = useGetCostTotalDetailsQuery({
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
  const statistics = totalData?.statisticalCostDetails || {};

  const days = new Array(getDaysInMonth()).fill(0);
  statistics?.totalDetails?.map((item) => {
    const day = item.purchaseTime.split("-")[1];
    const index = parseInt(day) - 1;
    days[index] = item.amounts;
  });

  const { data: budgetsData, refetch: budgetsRefetch } = useGetStatisticalBudgetQuery({
    variables: {
      input: { date: getCurrentDate("YYYY-MM") }
    },
    fetchPolicy: "network-only"
  });

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

  const onRefresh = (done: () => void) => {
    if (!token) return done();

    setTimeout(() => {
      Promise.all([totalRefetch(), classifiedRefetch(), budgetsRefetch()]).finally(() => {
        done();
      });
    }, 500);
  };

  useEffect(() => {
    if (!budgetsData && !!token) budgetsRefetch();
  }, [token]);

  return (
    <Page pageContent={false}>
      <Navbar className="h-16" noHairline large transparent>
        <NavRight>
          {/* 记账 */}
          <Link href="/book-keeping" className="no-active-state">
            <div className="flex justify-center items-center">
              <Icons name="notepad-01" className="shadow-2 shadow-active-2 rounded-md p-1 mr-3 svg-icon-36" />
            </div>
          </Link>

          {/* 账单 */}
          <Link href="/bill" className="no-active-state !mx-0">
            <div className="flex justify-center items-center">
              <Icons name="bill" className="shadow-2 shadow-active-2 rounded-md p-1 mr-3 svg-icon-36" />
            </div>
          </Link>

          <ThemeIcon />
        </NavRight>
      </Navbar>
      <PageContent className="pt-32" ptr onPtrRefresh={onRefresh}>
        {!!token && (
          <div className="px-4 pb-12">
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
                  <span className="text-xs text-gray-500 pl-1">共计 {thousands(statistics?.total) || 0} 笔</span>
                </div>

                <div>
                  <span className="text-xs font-medium">￥</span>
                  <span className="text-xl font-medium">
                    {costType === "pay" && thousands(statistics.pay || 0)}
                    {costType === "income" && thousands(statistics.income || 0)}
                  </span>
                </div>
              </div>

              <PaymentAnalysis days={days} type={costType} />
            </div>

            <ClassificationContainer details={classifiedData} type={costType} />

            {/* {costType === "pay" && <BudgetContainer details={budgetsData} />} */}
            <BudgetContainer details={budgetsData} />
          </div>
        )}
      </PageContent>
      {!token && <NotloggedIn />}
    </Page>
  );
};

export default memo(Home);
