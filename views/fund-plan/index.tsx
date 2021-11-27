import React from "react";
import {
  Page,
  Navbar,
  NavRight,
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  BlockTitle,
  useStore,
  f7,
  Link
} from "framework7-react";
import { relative } from "lib/api/dayjs";
import { thousands, timeStamp, toastTip } from "lib/api/utils";
import Icons from "components/Icons";
import Amounts from "components/Amounts";
import DetailItem from "./components/DetailItem";
import {
  useFundPlanQuery,
  useModifyFundPlanMutation,
  useRemoveFundPlanMutation
} from "apollo/graphql/model/fund-plan.graphql";
import { useStatisticalFundPlanQuery } from "apollo/graphql/model/statistics.graphql";

const FundPlan: React.FC = () => {
  const token = useStore("token");
  const { data } = useFundPlanQuery({
    variables: {
      input: {}
    },
    fetchPolicy: "network-only"
  });

  const { data: statisticalData } = useStatisticalFundPlanQuery({
    variables: {
      input: {}
    }
  });

  const [modifyFundPlan] = useModifyFundPlanMutation();
  const [removeFundPlan] = useRemoveFundPlanMutation();
  const details = data?.fundPlan.data || [];
  const serverTime = data?.fundPlan.time;
  const statistical = statisticalData?.statisticalFundPlan;

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
    <Page noToolbar pageContent={true}>
      <Navbar backLink noHairline title="资金计划">
        <NavRight>
          <Icons name="add" className="account-book-add-icon px-2" />
        </NavRight>
      </Navbar>

      <BlockTitle className="px-6 mx-0 mt-10 mb-0 flex justify-between items-center text-gray-700 text-xl">
        计划中
        <div className="plan-icons flex items-center">
          <Link href="/fund-plan-completed">
            <Icons name="complete-01" className="complete-icon mr-2" />
          </Link>
          {/* <Icons name="overdue-01" className="overdue-icon link" /> */}
        </div>
      </BlockTitle>

      <div className="px-6 mt-5">
        <Amounts pay={thousands(statistical?.total || 0)} payTitle="预计支出" />
      </div>

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
    </Page>
  );
};

export default FundPlan;
