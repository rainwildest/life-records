import React, { useState, useEffect } from "react";
import { Page, PageContent, Button, Navbar, NavTitle, NavRight } from "framework7-react";
import CostCard from "components/CostCard";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import { RouterOpotions } from "typings/f7-route";
import { thousands, isSameDay } from "lib/api/utils";
import { format, relative } from "lib/api/dayjs";
import Amounts from "components/Amounts";
import { useDetailsQuery } from "apollo/graphql/model/statistics.graphql";

const Bill: React.FC<RouterOpotions> = () => {
  const [picker, setPicker] = useState(null);
  const [date, setDate] = useState("");
  const openPicker = () => picker.open();

  const { loading, data, refetch } = useDetailsQuery({
    variables: { date }
  });

  useEffect(() => {
    if (!window) return;
    const picker = DatePicker({}, (e) => {
      setDate(e);
    });
    setDate(formatDatePicker(picker?.value as string[]));
    setPicker(picker);
  }, []);

  const statistics = data?.statisticalDetails || {};
  console.log(statistics);
  return (
    <Page noToolbar pageContent={false}>
      <Navbar noHairline backLink>
        <NavTitle>账单</NavTitle>
        <NavRight>
          <Button className="w-20" large small fill onClick={openPicker}>
            {date}
          </Button>
        </NavRight>
      </Navbar>
      <PageContent
        ptr
        onPtrRefresh={(done) => {
          setTimeout(() => {
            refetch({ date });
            done();
          }, 2000);
        }}
        className="pt-14 px-6"
      >
        <Amounts className="mt-10" income={thousands(statistics.income)} pay={thousands(statistics.pay)} />

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
      </PageContent>
    </Page>
  );
};

export default Bill;
