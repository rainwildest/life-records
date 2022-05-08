import React, { useState, useRef, memo, useEffect } from "react";
import { Page, PageContent, Navbar, NavTitle, NavRight, useStore } from "framework7-react";
import { CostCard, SheetModalPicker, SheetDatePicker, NotloggedIn } from "components";
import { RouterProps } from "typings/f7-route";
import { thousands, isJSON } from "lib/apis/utils";
import { getCurrentDate, getCalendar } from "lib/apis/dayjs";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { useGetCostDataDetailsQuery, useGetCostTotalQuery } from "graphql/model/statistics.graphql";
import { AmountTotal } from "./components";
import _ from "lodash";
import store from "lib/store";

const Bill: React.FC<RouterProps> = () => {
  const token = useStore("token");

  const hadAuthInvalid = useRef(false);
  const expenseId = useRef("");

  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));
  const [costType, setCostType] = useState<keyof AmountType>("pay");
  const [typeName, setTypeName] = useState("全部");
  // const [authInvalid, setAuthInvalid] = useState(false);

  const [sheetTypeOpened, setSheetTypeOpened] = useState(false);
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const { loading, data, refetch, error } = useGetCostDataDetailsQuery({
    variables: { input: { date, type: costType, expenseId: expenseId.current } },
    fetchPolicy: "network-only"
  });
  const costDetails = data?.statisticalCostDetails;

  const {
    data: totalData,
    loading: totalLoading,
    refetch: totalRefetch,
    error: totalError
  } = useGetCostTotalQuery({
    variables: { input: { date, type: costType, expenseId: expenseId.current, groupFormat: date.length === 4 ? "YYYY" : "MM" } },
    fetchPolicy: "network-only"
  });
  const statistics = totalData?.statisticalCostDetails;

  const {
    data: expenseData,
    loading: expenseLoading,
    refetch: expenseReftch,
    error: expenseError
  } = useLivingExpensesQuery({
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

  const onRefresh = (done?: () => void) => {
    if (!token) return done();

    setTimeout(() => {
      Promise.all([refetch(), totalRefetch(), expenseReftch()]).finally(() => {
        done && done();
      });
    }, 2000);
  };

  useEffect(() => {
    const hadLoading = !loading && !totalLoading && !expenseLoading;
    console.log([expenseError?.message, error?.message, totalError?.message], loading, totalLoading, expenseLoading);
    if ((expenseError?.message || error?.message || totalError?.message) && hadLoading) {
      const isInvalid = [error?.message, expenseError?.message, totalError?.message].some(
        (item) => isJSON(item) && _.has(JSON.parse(item), "code")
      );
      console.log("sdfsdff", isInvalid);
      isInvalid && store.dispatch("setToken", "");
      hadAuthInvalid.current = isInvalid;
      // setAuthInvalid(isInvalid);
    }
  }, [expenseError, error, totalError]);

  useEffect(() => {
    console.log("sfsdfsdfsfsdfsdf");
    if (!hadAuthInvalid.current) return;
    token && onRefresh();
    token && (hadAuthInvalid.current = false);
  }, [token]);

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

        {token && (
          <AmountTotal
            type={costType}
            total={thousands(statistics?.total || 0)}
            amount={thousands((costType === "pay" ? statistics?.pay : statistics?.income) || 0)}
          />
        )}

        {token && (
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
                  className="mt-6 shadow-3"
                />
              );
            })}
          </section>
        )}
        {!token && <NotloggedIn />}

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
    </Page>
  );
};

export default memo(Bill);
