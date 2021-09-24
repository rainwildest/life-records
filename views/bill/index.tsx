import React, { useState } from "react";
import {
  Page,
  PageContent,
  Button,
  Navbar,
  NavTitle,
  NavRight
} from "framework7-react";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import { useStatisticalDetailsQuery } from "apollo/graphql/model/statistics.graphql";
import { format } from "lib/api/dayjs";
import CostCard from "components/CostCard";

const Bill: React.FC = () => {
  const picker = DatePicker((e) => {
    setDate(e);
  });
  const [date, setDate] = useState(formatDatePicker(picker.value as string[]));
  const openPicker = () => picker.open();

  const { loading, data, refetch } = useStatisticalDetailsQuery({
    variables: { date }
  });
  console.log(data);
  const statistics = data?.statisticalDetails || {};

  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink>
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
        <div className="mb-10 mt-10">
          <div className="shadow-3 p-4 rounded-lg text-xs text-right font-bold">
            <span>收入：{statistics.income || 0}</span>
            <span className="pl-4">支出：{statistics.pay || 0}</span>
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
            amount={detail.expensePrice}
            remarks={detail.remarks}
          />
        ))}
      </PageContent>
    </Page>
  );
};

export default Bill;
