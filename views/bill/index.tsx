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
import Amounts from "components/Amounts";

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
        <Amounts
          className="mt-10"
          income={thousands(statistics.income)}
          pay={thousands(statistics.pay)}
        />

        {statistics.details?.map((detail, index) => (
          <CostCard
            key={detail.id}
            type={detail.expense.expenseType}
            typeName={detail.expense.expenseName}
            time={format(detail.purchaseTime)}
            amounts={thousands(detail.amounts)}
            remarks={detail.remarks}
            className="mt-8"
          />
        ))}
      </PageContent>
    </Page>
  );
};

export default Bill;
