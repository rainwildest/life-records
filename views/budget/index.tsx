import React, { useState, useEffect } from "react";
import { Page, PageContent, Navbar, NavRight, Link, BlockTitle } from "framework7-react";
import { Icons, SheetDatePicker } from "components";
import { useGetBudgetsQuery } from "graphql/model/budget.graphql";
import { getCurrentDate } from "lib/apis/dayjs";
import { thousands } from "lib/apis/utils";
import event from "lib/apis/framework-event";

const Budget: React.FC = () => {
  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const { data: budgetsData, refetch: budgetRefetch } = useGetBudgetsQuery({ variables: { input: { date } } });
  const budgets = budgetsData?.budgets;

  const onToggledDateSheet = () => {
    setSheetDateOpened(!sheetDateOpened);
  };

  const onConfirmDateSheet = (e: string) => {
    setDate(e);
  };

  useEffect(() => {
    event.on("update-budget", () => {
      budgetRefetch();
    });

    return () => {
      event.off("update-budget");
    };
  }, []);

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" backLink noHairline title="预算中心">
        <NavRight>
          <Link href="/budget-modify" className="">
            <Icons name="add-01" className="link svg-icon-26 px-2" />
          </Link>
        </NavRight>
      </Navbar>

      <PageContent ptr className="pt-20">
        <div className="pt-2 px-6">
          <div className="flex justify-end mb-6">
            <div
              className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1.5 rounded-full items-center"
              onClick={onToggledDateSheet}
            >
              <span>{date}</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>
          </div>

          <section className="">
            <div className="shadow-3 py-3 px-4 rounded-lg ">
              <div className="relative overflow-hidden flex items-center flex-shrink-0">
                <div className="flex items-center">
                  <Icons name="statistics-01" className="svg-icon-36 pb-0.5" />
                  <span className="pl-0.5 leading-6 font-bold text-lg">预算总金额</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-gray-800 font-bold truncate mt-4 mb-2">
                  <span className="text-sm">￥</span>
                  <span className="text-2xl">{thousands(budgets?.total || 0)}</span>
                </div>
              </div>
            </div>
          </section>

          {budgets?.data?.map((item) => {
            const expense = item.expense;

            return (
              <div className="shadow-3 rounded-lg py-3 px-4 mt-7 flex justify-between" key={item.id}>
                <div className="budget-title flex items-center flex-shrink-0 text-sm">
                  <Icons name={expense.expenseIcon} className={`svg-icon-30 pr-2`} />
                  <div className="truncate text-gray-700">{expense.expenseName}</div>
                </div>

                <div className="shadow-3 rounded-lg flex items-baseline justify-end min-w-20 max-w-36 font-semibold px-3 py-2">
                  <span className="text-xs">￥</span>
                  <span className="text-lg truncate">{thousands(item.amounts || 0)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <SheetDatePicker
          date={date}
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

export default Budget;
