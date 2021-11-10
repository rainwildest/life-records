import React, { useState, useEffect } from "react";
import {
  Page,
  PageContent,
  Button,
  Navbar,
  NavTitle,
  NavRight
} from "framework7-react";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import { useDetailsQuery } from "apollo/graphql/model/statistics.graphql";
import { format } from "lib/api/dayjs";
import CostCard from "components/CostCard";
import { RouterOpotions } from "typings/f7-route";
import { thousands } from "lib/api/utils";
import Icons from "components/Icons";

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
        {/* <div className="mb-10 mt-10">
          <div className="shadow-3 px-4 py-5 rounded-lg text-xs text-gray-700 text-right font-bold">
            <span>收入：{thousands(statistics.income)}</span>
            <span className="pl-4">支出：{thousands(statistics.pay)}</span>
          </div>
        </div> */}
        <div className="amounts-icon-1 shadow-3 px-4 py-3 mt-10 rounded-lg text-xs text-gray-700 text-right font-bold flex justify-between items-center">
          <Icons name="amounts" />
          <div>
            <span>收入：{thousands(statistics.income)}</span>
            <span className="pl-4">支出：{thousands(statistics.pay)}</span>
          </div>
        </div>

        {statistics.details?.map((detail, index) => (
          <CostCard
            key={detail.id}
            incomeTitle="收入"
            payTitle="支出"
            useMarginTop14={!index}
            type={detail.expense.expenseType}
            typeName={detail.expense.expenseName}
            time={format(detail.purchaseTime)}
            amounts={thousands(detail.amounts)}
            remarks={detail.remarks}
          />
        ))}
      </PageContent>
    </Page>
  );
};

export default Bill;
