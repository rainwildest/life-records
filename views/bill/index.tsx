import React, { useState, useRef, memo } from "react";
import { Page, PageContent, Navbar, NavTitle, NavRight, BlockTitle } from "framework7-react";
import { Icons, CostCard, Amounts, SheetModalPicker, SheetDatePicker } from "components";
import { RouterOpotions } from "typings/f7-route";
import { thousands } from "lib/apis/utils";
import { getCurrentDate, getCalendar } from "lib/apis/dayjs";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { useGetCostDataDetailsQuery, useGetCostTotalQuery } from "graphql/model/statistics.graphql";

const Bill: React.FC<RouterOpotions> = () => {
  const expenseId = useRef("");

  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));
  const [costType, setCostType] = useState<keyof AmountType>("pay");

  const [typeName, setTypeName] = useState("全部");

  const [sheetTypeOpened, setSheetTypeOpened] = useState(false);
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const { loading, data, refetch } = useGetCostDataDetailsQuery({
    variables: { input: { date, type: costType, expenseId: expenseId.current } },
    fetchPolicy: "network-only"
  });
  const costDetails = data?.statisticalCostDetails;

  const { data: totalData, refetch: totalRefetch } = useGetCostTotalQuery({
    variables: { input: { date, type: costType, expenseId: expenseId.current } },
    fetchPolicy: "network-only"
  });

  console.log(totalData);

  const { data: expenseData, refetch: expenseReftch } = useLivingExpensesQuery({
    variables: { type: costType },
    fetchPolicy: "network-only"
  });
  const expense = expenseData?.livingExpenses;

  const expenseIds = [""];
  const expenseDisplays = ["全部"];

  expense?.forEach((item) => {
    expenseIds.push(item.id);
    expenseDisplays.push(item.expenseName);
  });

  const onSetCostType = (e: any) => {
    const target = e.target as HTMLDivElement;
    const type = target.getAttribute("data-type");

    if (costType !== type) {
      expenseId.current = "";
      setTypeName("全部");
    }

    setCostType(type as keyof AmountType);
  };

  const onTypeConfirm = (values, indexs) => {
    const name = expenseDisplays[indexs[0]];
    expenseId.current = values[0];
    setTypeName(name);
  };

  const onToggleTypeSheet = () => {
    setSheetTypeOpened(!sheetTypeOpened);
  };

  const onToggledDateSheet = () => {
    setSheetDateOpened(!sheetDateOpened);
  };

  const onConfirmDateSheet = (e: string) => {
    setDate(e);
  };

  const onRefresh = (done: () => void) => {
    setTimeout(() => {
      Promise.all([refetch(), totalRefetch(), expenseReftch()]).finally(() => {
        done();
      });
    }, 2000);
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" noHairline backLink>
        <NavTitle>账单</NavTitle>
        <NavRight>
          <div
            className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1.5 rounded-md items-center"
            onClick={onToggledDateSheet}
          >
            <span>{date}</span>
            <div className="ml-2 w-0 h-0 triangle" />
          </div>
        </NavRight>
      </Navbar>
      <PageContent ptr className="pt-16" onPtrRefresh={onRefresh}>
        <section className="px-6 mx-0 pt-5 mb-0 flex justify-end items-center text-gray-700 text-xl overflow-visible">
          <div className="flex items-center">
            <div
              data-type="pay"
              className={`${costType === "pay" ? "shadow-inset-2" : "shadow-3"} rounded-md px-4 py-1 text-xs`}
              onClick={onSetCostType}
            >
              支付
            </div>
            <div
              data-type="income"
              className={`${costType === "income" ? "shadow-inset-2" : "shadow-3"} rounded-md px-4 py-1 text-xs mx-4`}
              onClick={onSetCostType}
            >
              收入
            </div>

            <div
              onClick={onToggleTypeSheet}
              className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1 rounded-full items-center"
            >
              <span>{typeName}</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>
          </div>
        </section>

        <section className="px-5 shadow-3 rounded-lg py-3 relative overflow-hidden w-full">
          <div>
            <Icons name="amounts" className="amounts-icon svg-icon-30" />
          </div>
        </section>

        <section className="px-5">
          {costDetails?.details?.map((detail) => {
            const expense = detail.expense;

            return (
              <CostCard
                icon={expense.expenseIcon}
                key={detail.id}
                book={detail.book?.name}
                type={expense.expenseType}
                typeName={expense.expenseName}
                time={getCalendar(detail.purchaseTime)}
                amounts={thousands(detail.amounts)}
                remarks={detail.remarks}
                className="mt-6"
              />
            );
          })}
        </section>

        <SheetModalPicker
          sheetOpened={sheetTypeOpened}
          cols={[
            {
              textAlign: "center",
              displayValues: expenseDisplays,
              values: expenseIds
            }
          ]}
          onConfirm={onTypeConfirm}
          onSheetClosed={onToggleTypeSheet}
        />

        <SheetDatePicker
          date={date}
          hasFullYears={true}
          isCurrnetYear={true}
          isCurrentMonth={true}
          sheetOpened={sheetDateOpened}
          onSheetClosed={onToggledDateSheet}
          onConfirm={onConfirmDateSheet}
        />
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

export default memo(Bill);
