import React, { useState } from "react";
import { Page, Navbar, NavRight, Link, BlockTitle } from "framework7-react";
import { Icons, SheetDatePicker } from "components";
import { useGetBudgetsQuery } from "graphql/model/budget.graphql";
import { getCurrentDate } from "lib/apis/dayjs";

const Budget: React.FC = () => {
  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const { data: budgetsData } = useGetBudgetsQuery({ variables: { input: { date } } });
  const budgets = budgetsData?.budgets || [];
  console.log(budgets);
  const onToggledDateSheet = () => {
    setSheetDateOpened(!sheetDateOpened);
  };

  const onConfirmDateSheet = (e: string) => {
    setDate(e);
  };

  return (
    <Page noToolbar>
      <Navbar className="h-12" backLink noHairline title="预算中心">
        <NavRight>
          <Link href="/budget-modify" className="">
            <Icons name="add-01" className="link svg-icon-26 px-2" />
          </Link>
        </NavRight>
      </Navbar>

      <div className="pt-2 px-6 mb-0 mt-10">
        <BlockTitle className="mx-0 mt-0 mb-7 text-gray-700 text-xl">
          十月<span className="px-1">·</span>预算
        </BlockTitle>
        <div className="shadow-3 rounded-lg py-3 px-4 flex justify-between">
          <div className="budget-title flex items-center flex-shrink-0 text-sm">
            <Icons name="budget" className="svg-icon-30 pr-3" />
            <div className="truncate text-gray-700">预算总金额</div>
          </div>

          <div className="shadow-3 rounded-lg w-24 h-10 flex items-center justify-center px-3 py-2 box-border text-sm overflow-hidden">
            <div className="text-gray-700">100</div>
          </div>
        </div>

        {budgets.map((item) => {
          const expense = item.expense;

          return (
            <div className="shadow-3 rounded-lg py-3 px-4 mt-7 flex justify-between" key={item.id}>
              <div className="budget-title flex items-center flex-shrink-0 text-sm">
                <Icons
                  name={expense.expenseIcon || "default-01"}
                  className={`svg-icon-30 pr-2 ${!expense.expenseIcon ? "default-icon-color" : ""}`}
                />
                <div className="truncate text-gray-700">{expense.expenseName}</div>
              </div>

              <div className="shadow-3 rounded-lg flex items-baseline justify-end min-w-28 font-semibold px-3 py-2">
                <span className="text-xs">￥</span>
                <span className="text-lg">{item.amounts}</span>
              </div>
            </div>
          );
        })}
      </div>

      <SheetDatePicker
        date={date}
        hasFullYears={true}
        isCurrnetYear={true}
        isCurrentMonth={true}
        sheetOpened={sheetDateOpened}
        onSheetClosed={onToggledDateSheet}
        onConfirm={onConfirmDateSheet}
      />
    </Page>
  );
};

export default Budget;
