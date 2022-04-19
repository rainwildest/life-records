import React, { useState, useEffect } from "react";
import { Page, PageContent, Button, Navbar, NavTitle, NavRight, BlockTitle } from "framework7-react";
import { CostCard, Amounts } from "components";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import { RouterOpotions } from "typings/f7-route";
import { thousands, isSameDay } from "lib/apis/utils";
import { format, relative, getCurrentDate } from "lib/apis/dayjs";
// import { useDetailsQuery } from "graphql/model/statistics.graphql";

const Bill: React.FC<RouterOpotions> = () => {
  // const [picker, setPicker] = useState(null);
  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));
  // const openPicker = () => picker.open();

  // const { loading, data, refetch } = useDetailsQuery({
  //   // variables: { date }
  // });

  // useEffect(() => {
  //   if (!window) return;
  //   const picker = DatePicker({}, (e) => {
  //     setDate(e);
  //   });
  //   setDate(formatDatePicker(picker?.value as string[]));
  //   setPicker(picker);
  // }, []);

  // const statistics = data?.statisticalDetails || {};
  // const test = () => {
  //   // updateQuery();
  // };
  // console.log(statistics);
  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" noHairline backLink>
        <NavTitle>账单</NavTitle>
        {/* <NavRight>
          <Button className="w-20" large small fill>
            {date}
          </Button>
        </NavRight> */}
      </Navbar>
      <PageContent>
        <BlockTitle className="px-6 mx-0 mt-10 mb-0 flex justify-between items-center text-gray-700 text-xl overflow-visible">
          账单列表
          <div className="flex items-center">
            <div className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1 rounded-full items-center mr-3">
              <span>{date}</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>

            <div className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1 rounded-full items-center">
              <span>全部</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>
          </div>
        </BlockTitle>
      </PageContent>
      {/* <PageContent
        ptr
        onPtrRefresh={(done) => {
          setTimeout(() => {
            refetch();
            done();
          }, 2000);
        }}
        className="pt-16 px-6"
      >
        <Amounts className="mt-2" income={thousands(statistics.income)} pay={thousands(statistics.pay)} />

        {statistics.details?.map((detail) => {
          const _isSameDay = isSameDay(detail.purchaseTime);
          const _fun = _isSameDay ? relative : format;

          return (
            <CostCard
              key={detail.id}
              type={detail.expense.expenseType}
              typeName={detail.expense.expenseName}
              time={_fun(detail.purchaseTime)}
              amounts={thousands(detail.amounts)}
              remarks={detail.remarks}
              className="mt-8"
            />
          );
        })}
      </PageContent> */}
    </Page>
  );
};

export default Bill;
