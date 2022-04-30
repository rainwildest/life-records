import React, { useState, useRef } from "react";
import { Page, PageContent, Navbar, List, ListItem, SwipeoutActions, SwipeoutButton, useStore, f7 } from "framework7-react";
import { getCurrentDate, getCalendar } from "lib/apis/dayjs";
import { thousands, timeStamp, toastTip } from "lib/apis/utils";
import { DetailItem } from "./components";
import { Icons, Amounts, SheetModalPicker, SheetDatePicker } from "components";
import { useFundPlanQuery, useRemoveFundPlanMutation } from "graphql/model/fund-plan.graphql";
import { useStatisticalFundPlanQuery } from "graphql/model/statistics.graphql";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";

const Completed: React.FC = () => {
  const token = useStore("token");
  const expenseId = useRef("");

  const [date, setDate] = useState(getCurrentDate("YYYY"));
  const [typeName, setTypeName] = useState("全部");
  const [sheetTypeOpened, setSheetTypeOpened] = useState(false);
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const { data, refetch } = useFundPlanQuery({
    variables: {
      input: { type: "complete", year: date, expenseId: expenseId.current }
    },
    fetchPolicy: "network-only"
  });
  const { data: statisticalData, refetch: statisticalRefetch } = useStatisticalFundPlanQuery({
    variables: {
      input: { year: date, expenseId: expenseId.current }
    },
    fetchPolicy: "network-only"
  });
  const { data: expenseData } = useLivingExpensesQuery();
  const [removeFundPlan] = useRemoveFundPlanMutation();

  const details = data?.fundPlan.data || [];
  const statistical = statisticalData?.statisticalFundPlan;
  const expense = expenseData?.livingExpenses || [];

  const expenseIds = [""];
  const expenseDisplays = ["全部"];

  expense?.forEach((item) => {
    expenseIds.push(item.id);
    expenseDisplays.push(item.expenseName);
  });

  const onDeleted = (val: string, el: string) => {
    removeFundPlan({ variables: { id: val } })
      .then(() => {
        f7.swipeout.delete(el);
        refetch();
      })
      .catch(() => {
        toastTip("删除失败");
      });
  };

  const onDeletedBefore = (val: string, el: string) => {
    return () => {
      f7.dialog.confirm("是否确定删除", "删除提示", function () {
        onDeleted(val, el);
      });
    };
  };

  const onToggleTypeSheet = () => {
    setSheetTypeOpened(!sheetTypeOpened);
  };

  const onToggledDateSheet = () => {
    setSheetDateOpened(!sheetDateOpened);
  };

  const onTypeConfirm = (values, indexs) => {
    const name = expenseDisplays[indexs[0]];
    expenseId.current = values[0];
    setTypeName(name);
  };

  const onConfirmDateSheet = (e: string) => {
    setDate(e);
  };

  const onRefresh = (done: () => void) => {
    if (!token) return done();

    setTimeout(() => {
      Promise.all([refetch(), statisticalRefetch()]).finally(() => {
        done();
      });
    }, 2000);
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" backLink noHairline title="完成的计划"></Navbar>
      <PageContent className="pt-16" ptr onPtrRefresh={onRefresh}>
        <div className="px-6 pt-5 m-0 flex justify-end items-center text-gray-700 text-xl overflow-visible">
          <div className="flex items-center">
            <div
              className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1.5 rounded-full items-center"
              onClick={onToggledDateSheet}
            >
              <span>{date}</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>

            <div
              onClick={onToggleTypeSheet}
              className="shadow-active-2 ml-3 select-container text-xs inline-flex shadow-2 px-3 py-1 rounded-full items-center"
            >
              <span>{typeName}</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>
          </div>
        </div>

        <section className="px-5 pt-6">
          <div className="shadow-3 py-3 px-4 rounded-lg ">
            <div className="relative overflow-hidden flex items-center flex-shrink-0">
              <div className="flex items-center">
                <Icons name="statistics-01" className="svg-icon-36 pb-0.5" />
                <span className="pl-0.5 leading-6 font-bold text-lg">支出统计</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-gray-800 font-bold truncate mt-4 mb-2">
                <span className="text-sm">￥</span>
                <span className="text-2xl">{thousands(statistical?.total || 0)}</span>
              </div>
            </div>
          </div>
        </section>

        <List className="swipeout-container pt-2 px-6 my-0">
          {details.map((detail) => {
            const { expense } = detail;
            const hasOverdue = timeStamp(detail.approximateAt) < timeStamp(detail.completeAt);
            const status = hasOverdue ? "complete-03" : "";

            return (
              <ListItem
                className={`swipeout-item shadow-3 rounded-lg mt-5 plant-${detail.seqId}`}
                divider={false}
                swipeout
                key={detail.id}
              >
                <DetailItem
                  slot="title"
                  icon={expense?.expenseIcon}
                  status={status}
                  name={detail.name}
                  type={expense?.expenseName}
                  amounts={thousands(detail.amounts)}
                  date={getCalendar(detail.completeAt)}
                />
                <SwipeoutActions className="flex items-center" right>
                  <SwipeoutButton
                    color="red"
                    className="swipeout-operation link !text-sm !font-bold"
                    onClick={onDeletedBefore(detail.id, `.plant-${detail.seqId}`)}
                  >
                    删 除
                  </SwipeoutButton>
                </SwipeoutActions>
              </ListItem>
            );
          })}
        </List>

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
          type="full-year"
          sheetOpened={sheetDateOpened}
          onSheetClosed={onToggledDateSheet}
          onConfirm={onConfirmDateSheet}
        />
      </PageContent>
    </Page>
  );
};

export default Completed;
