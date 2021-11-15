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

const Completed: React.FC = () => {
  const { data } = useFundPlanQuery({
    variables: { input: { type: "complete" } }
  });
  const details = data?.fundPlan.data || [];

  // useEffect(() => {

  // }, []);
  const today = new Date();
  /* years */
  const years = [];
  const ColValuesYears = { values: years };
  const currentYear = today.getFullYear();
  for (let i = 0; i < currentYear - 1995 + 5; ++i) years.push(1995 + i);
  const [date, setDate] = useState([currentYear]);
  const [type, setType] = useState(["2"]);

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
              values={date}
              onComfire={(val) => {
                console.log(val);
                setDate(val);
              }}
            />

            <Select
              className="ml-3"
              cols={[
                {
                  textAlign: "center",
                  displayValues: ["全部", "生活"],
                  values: ["1", "2"]
                }
              ]}
              values={type}
              format={(values, displayValues, index) => displayValues[index]}
              onComfire={(val) => {
                console.log(val);
                setType(val);
              }}
            />
          </div>
        </BlockTitle>

        <div className="px-6 mt-5">
          <Amounts pay={thousands(1000)} payTitle="支出" />
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
                    // onClick={onDeletedBefore(
                    //   detail.id,
                    //   `plant-${detail.seqId}`
                    // )}
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
