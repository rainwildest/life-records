import React, { useEffect } from "react";
import {
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  f7
} from "framework7-react";
import { relative } from "lib/api/dayjs";
import { thousands, timeStamp } from "lib/api/utils";
import DetailItem from "./DetailItem";
import { useFundPlanQuery } from "apollo/graphql/model/fund-plan.graphql";

const Planned: React.FC = () => {
  const { data } = useFundPlanQuery({
    variables: {
      input: {}
    }
  });
  console.log(data);
  const details = data?.fundPlan.data || [];
  const serverTime = data?.fundPlan.time;

  details.forEach((item) => {
    console.log(timeStamp(item.approximateAt), data?.fundPlan.time);
  });

  const onDeleted = () => {
    f7.dialog.alert("Thanks, item removed!");
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     f7.swipeout.delete(".plant-item");
  //   }, 3000);
  // }, []);
  return (
    <List className="plant-items-container pt-2 px-6 my-0">
      {details.map((detail) => {
        const { expense } = detail;
        const hasOverdue = timeStamp(detail.approximateAt) < serverTime;
        const status = hasOverdue ? "overdue-02" : "";
        return (
          <ListItem
            className="plant-item shadow-3 rounded-lg mt-8"
            divider={false}
            swipeout
            // onSwipeoutDeleted={onDeleted}
          >
            <DetailItem
              slot="title"
              icon="budget"
              status={status}
              name={detail.name}
              type={expense.expenseName}
              amounts={thousands(detail.amounts)}
              date={relative(detail.approximateAt)}
            />
            <SwipeoutActions className="flex items-center" right>
              <SwipeoutButton
                className="plant-operation link !text-sm !font-bold"
                color="green"
              >
                完 成
              </SwipeoutButton>
              <SwipeoutButton
                className="plant-operation link !text-sm !font-bold"
                confirmText="是否确定删除"
                confirmTitle="提示"
                delete
              >
                删 除
              </SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Planned;
