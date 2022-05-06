import React, { useState, useEffect } from "react";
import {
  Page,
  PageContent,
  List,
  ListItem,
  Navbar,
  NavRight,
  Link,
  SwipeoutActions,
  SwipeoutButton,
  f7,
  useStore
} from "framework7-react";
import { Icons, SheetDatePicker } from "components";
import { useGetBudgetsQuery, useRemoveBudgetMutation, GetBudgetsDocument, GetBudgetsQuery } from "graphql/model/budget.graphql";
import { getCalendar, getCurrentDate } from "lib/apis/dayjs";
import { thousands, toastTip } from "lib/apis/utils";
import event from "lib/apis/framework-event";
import { RouterProps } from "typings/f7-route";

const Budget: React.FC<RouterProps> = ({ f7router }) => {
  const token = useStore("token");

  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const { data: budgetsData, refetch: budgetRefetch } = useGetBudgetsQuery({ variables: { input: { date } } });
  const budgets = budgetsData?.budgets;

  const [removeBudget] = useRemoveBudgetMutation();

  const onToggledDateSheet = () => {
    setSheetDateOpened(!sheetDateOpened);
  };

  const onConfirmDateSheet = (e: string) => {
    setDate(e);
  };

  const onNavigate = (id: string) => {
    return () => {
      const url = f7router.generateUrl({
        name: "budget-modify",
        query: { id },
        params: {}
      });

      f7router.navigate(url);
    };
  };

  const onDeletedBefore = (val: string, el: string) => {
    return () => {
      f7.dialog.confirm("是否确定删除", "删除提示", function () {
        onDeleted(val, el);
      });
    };
  };

  const onDeleted = (val: string, el: string) => {
    removeBudget({
      variables: { id: val },
      update: (cache, { data }) => {
        if (!data) return;

        const query = cache.readQuery({
          query: GetBudgetsDocument,
          variables: { input: { date } }
        }) as GetBudgetsQuery;

        const { data: queryData, total } = query.budgets;
        const remove = data.removeBudget;
        let $total = total;

        const $data = queryData.filter((item) => {
          if (item.id === remove.id) $total = total - item.amounts;
          return item.id !== remove.id;
        });

        cache.writeQuery({
          query: GetBudgetsDocument,
          variables: { input: { date } },
          data: { budgets: { ...budgets, data: $data, total: $total } }
        });
      }
    })
      .then(() => {
        f7.swipeout.delete(el);
        toastTip("删除成功");
      })
      .catch(() => {
        toastTip("删除失败");
      });
  };

  const onRefresh = (done: () => void) => {
    if (!token) return done();

    setTimeout(() => {
      Promise.all([budgetRefetch()]).finally(() => {
        done();
      });
    }, 500);
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

      <PageContent ptr className="pt-20" onPtrRefresh={onRefresh}>
        <div className="pt-2 px-4">
          <div className="flex justify-end mb-6">
            <div
              className="shadow-active-2 select-container text-xs inline-flex shadow-2 px-3 py-1.5 rounded-full items-center"
              onClick={onToggledDateSheet}
            >
              <span>{date}</span>
              <div className="ml-2 w-0 h-0 triangle" />
            </div>
          </div>

          <section className="shadow-3 py-3 px-4 rounded-lg">
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
          </section>

          <List className="swipeout-container pt-2 my-0 ">
            {budgets?.data?.map((item) => {
              const expense = item.expense;

              return (
                <ListItem
                  className={`swipeout-item shadow-3 rounded-lg mt-7 budget-${item.seqId} ${
                    budgets.hadEdit ? "shadow-active-3" : "overflow-hidden"
                  }`}
                  divider={false}
                  swipeout={budgets.hadEdit}
                  key={item.id}
                >
                  <div slot="title" className="py-3 px-4" key={item.id} onClick={budgets.hadEdit ? onNavigate(item.id) : null}>
                    <div className="flex justify-between items-center">
                      <div className="budget-title flex items-center flex-shrink-0 text-sm pointer-events-none">
                        <Icons name={expense.expenseIcon} className="svg-icon-30 pr-2 pointer-events-none" />
                        <div className="truncate text-gray-700">{expense.expenseName}</div>
                      </div>

                      <section>
                        <div className="text-xs text-gray-500 text-right pb-1.5">{getCalendar(item.createdAt)}</div>
                        <div className="flex items-baseline justify-end min-w-20 max-w-36 font-semibold pointer-events-none">
                          <span className="text-xs">￥</span>
                          <span className="text-lg truncate">{thousands(item.amounts || 0)}</span>
                        </div>
                      </section>
                    </div>
                  </div>
                  <SwipeoutActions className="flex items-center" right>
                    <SwipeoutButton
                      color="red"
                      className="swipeout-operation link !text-sm !font-bold"
                      onClick={onDeletedBefore(item.id, `.budget-${item.seqId}`)}
                    >
                      删 除
                    </SwipeoutButton>
                  </SwipeoutActions>
                </ListItem>
              );
            })}
          </List>
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
