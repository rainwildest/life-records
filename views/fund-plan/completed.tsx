import React, { useState, useEffect } from "react";
import {
  Page,
  PageContent,
  Navbar,
  NavRight,
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  BlockTitle,
  useStore,
  f7
} from "framework7-react";
import { format } from "lib/api/dayjs";
import { thousands, timeStamp, toastTip } from "lib/api/utils";
import DetailItem from "./components/DetailItem";
import Amounts from "components/Amounts";
import Select from "./components/Select";
import {
  useFundPlanQuery,
  useRemoveFundPlanMutation
} from "apollo/graphql/model/fund-plan.graphql";
import { useStatisticalFundPlanQuery } from "apollo/graphql/model/statistics.graphql";
import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";

const Completed: React.FC = () => {
  const today = new Date();
  /* years */
  const years = [];
  const ColValuesYears = { values: years };
  const currentYear = today.getFullYear();
  for (let i = 0; i < currentYear - 1995 + 5; ++i) years.push(1995 + i);
  const [year, setYear] = useState(currentYear);
  const [type, setType] = useState("");
  const [expenseIds, setExpenseIds] = useState([""]);
  const [expenseDisplay, setExpenseDisplay] = useState([""]);

  const { data } = useFundPlanQuery({
    variables: {
      input: { type: "complete", year: `${year}`, expenseId: type || null }
    },
    fetchPolicy: "network-only"
  });
  const { data: statisticalData, refetch } = useStatisticalFundPlanQuery({
    variables: {
      input: { year: `${year}`, expenseId: type || null }
    },
    fetchPolicy: "network-only"
  });
  const { data: expenseData } = useLivingExpensesQuery();
  const [removeFundPlan] = useRemoveFundPlanMutation();

  const details = data?.fundPlan.data || [];
  const statistical = statisticalData?.statisticalFundPlan;
  const expense = expenseData?.livingExpenses || [];

  const ids = [];
  const displays = [];
  expense.forEach((item) => {
    ids.push(item.id);
    displays.push(item.expenseName);
  });

  useEffect(() => {
    setExpenseIds(["", ...ids]);
    setExpenseDisplay(["全部", ...displays]);
  }, [expenseData]);

  const onDeleted = (val, el) => {
    removeFundPlan({ variables: { id: val } })
      .then(() => {
        f7.swipeout.delete(`.${el}`);
        refetch();
      })
      .catch(() => {
        toastTip("删除失败");
      });
  };

  const onDeletedBefore = (val, el) => {
    return () => {
      f7.dialog.confirm("是否确定删除", "删除提示", function () {
        onDeleted(val, el);
      });
    };
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink noHairline title="完成的计划"></Navbar>
      <PageContent>
        <BlockTitle className="px-6 mx-0 mt-10 mb-0 flex justify-between items-center text-gray-700 text-xl overflow-visible">
          已完成
          <div className="flex items-center">
            <Select
              cols={[
                {
                  textAlign: "center",
                  ...ColValuesYears
                }
              ]}
              values={[year]}
              onComfire={(val) => {
                setYear(val[0]);
              }}
            />

            <Select
              className="ml-3"
              cols={[
                {
                  textAlign: "center",
                  displayValues: expenseDisplay,
                  values: expenseIds
                }
              ]}
              values={[type]}
              format={(values, displayValues, index) => displayValues[index]}
              onComfire={(val) => {
                setType(val[0]);
              }}
            />
          </div>
        </BlockTitle>

        <div className="px-6 mt-5">
          <Amounts pay={thousands(statistical?.total || 0)} payTitle="支出" />
        </div>

        <List className="plant-items-container pt-2 px-6 my-0">
          {details.map((detail) => {
            const { expense } = detail;
            const hasOverdue =
              timeStamp(detail.approximateAt) < timeStamp(detail.completeAt);
            const status = hasOverdue ? "complete-03" : "";

            return (
              <ListItem
                className={`plant-item shadow-3 rounded-lg mt-8 plant-${detail.seqId}`}
                divider={false}
                swipeout
                key={detail.id}
              >
                <DetailItem
                  slot="title"
                  icon="budget"
                  status={status}
                  name={detail.name}
                  type={expense.expenseName}
                  amounts={thousands(detail.amounts)}
                  date={format(detail.completeAt)}
                />
                <SwipeoutActions className="flex items-center" right>
                  <SwipeoutButton
                    color="red"
                    className="plant-operation link !text-sm !font-bold"
                    onClick={onDeletedBefore(
                      detail.id,
                      `plant-${detail.seqId}`
                    )}
                  >
                    删 除
                  </SwipeoutButton>
                </SwipeoutActions>
              </ListItem>
            );
          })}
        </List>
      </PageContent>
    </Page>
  );
};

export default Completed;
