import React, { useEffect, memo } from "react";
import {
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  f7
} from "framework7-react";
import { relative } from "lib/api/dayjs";
import { thousands, timeStamp, toastTip } from "lib/api/utils";
import DetailItem from "./DetailItem";
import {
  useFundPlanQuery,
  useModifyFundPlanMutation,
  useRemoveFundPlanMutation
} from "apollo/graphql/model/fund-plan.graphql";

const Planned: React.FC = () => {
  const { data } = useFundPlanQuery({
    variables: {
      input: {}
    },
    fetchPolicy: "network-only"
  });
  const [modifyFundPlan] = useModifyFundPlanMutation();
  const [removeFundPlan] = useRemoveFundPlanMutation();
  const details = data?.fundPlan.data || [];
  const serverTime = data?.fundPlan.time;

  const onComplete = (val, el) => {
    modifyFundPlan({
      variables: {
        id: val,
        input: {
          completeAt: true
        }
      }
    })
      .then(() => {
        f7.swipeout.delete(`.${el}`);
      })
      .catch(() => {
        toastTip("确认失败");
      });
  };

  const onCompleteBefore = (val, el) => {
    return () => {
      f7.dialog.confirm("是否确定完成", "确定提示", function () {
        onComplete(val, el);
      });
    };
  };

  const onDeleted = (val, el) => {
    removeFundPlan({ variables: { id: val } })
      .then(() => {
        f7.swipeout.delete(`.${el}`);
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
    <List className="plant-items-container pt-2 px-6 my-0">
      {details.map((detail) => {
        const { expense } = detail;
        const hasOverdue = timeStamp(detail.approximateAt) < serverTime;
        const status = hasOverdue ? "overdue-02" : "";

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
              date={relative(detail.approximateAt)}
            />
            <SwipeoutActions className="flex items-center" right>
              <SwipeoutButton
                color="green"
                className="plant-operation link !text-sm !font-bold"
                onClick={onCompleteBefore(detail.id, `plant-${detail.seqId}`)}
              >
                完 成
              </SwipeoutButton>
              <SwipeoutButton
                color="red"
                className="plant-operation link !text-sm !font-bold"
                onClick={onDeletedBefore(detail.id, `plant-${detail.seqId}`)}
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

export default memo(Planned);
