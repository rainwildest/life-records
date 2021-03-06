import React, { useEffect } from "react";
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
  f7,
  Link
} from "framework7-react";
import { relative } from "lib/apis/dayjs";
import { thousands, timeStamp, toastTip } from "lib/apis/utils";
import Icons from "components/Icons";
import DetailItem from "./components/DetailItem";
import { useFundPlanQuery, useModifyFundPlanMutation, useRemoveFundPlanMutation } from "graphql/model/fund-plan.graphql";
import { useStatisticalFundPlanQuery } from "graphql/model/statistics.graphql";
import { RouterProps } from "typings/f7-route";
import event from "lib/apis/framework-event";

const FundPlan: React.FC<RouterProps> = ({ f7router }) => {
  const token = useStore("token");
  const { data, refetch: dataRefetch } = useFundPlanQuery({
    variables: {
      input: {}
    },
    fetchPolicy: "network-only"
  });

  const { data: statisticalData, refetch: statisticalRefetch } = useStatisticalFundPlanQuery({
    variables: {
      input: {}
    },
    fetchPolicy: "network-only"
  });

  const [modifyFundPlan] = useModifyFundPlanMutation();
  const [removeFundPlan] = useRemoveFundPlanMutation();

  const details = data?.fundPlan.data || [];
  const serverTime = data?.fundPlan.time;
  const statistical = statisticalData?.statisticalFundPlan;

  const onComplete = (val: string, el: string) => {
    modifyFundPlan({
      variables: {
        id: val,
        input: {
          completeAt: true
        }
      }
    })
      .then(() => {
        f7.swipeout.delete(el);
        statisticalRefetch();
        toastTip("修改成功");
      })
      .catch(() => {
        toastTip("修改失败");
      });
  };

  const onCompleteBefore = (val: string, el: string) => {
    return () => {
      f7.dialog.confirm("是否确定完成", "确定提示", function () {
        onComplete(val, el);
      });
    };
  };

  const onDeleted = (val: string, el: string) => {
    removeFundPlan({ variables: { id: val } })
      .then(() => {
        f7.swipeout.delete(el);
        statisticalRefetch();
        toastTip("删除成功");
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

  const onNavigate = (id?: string) => {
    const url = f7router.generateUrl({
      name: "fund-plan-modify",
      params: { id: "id", name: "name" },
      query: { id: id || "", name: "" }
    });
    f7router.navigate(url);
  };

  const onCreatePlan = () => onNavigate();

  useEffect(() => {
    event.on("update-plan", () => {
      dataRefetch();
      statisticalRefetch();
    });

    return () => {
      event.off("update-plan");
    };
  }, []);

  const onRefresh = (done: () => void) => {
    if (!token) return done();

    setTimeout(() => {
      Promise.all([dataRefetch(), statisticalRefetch()]).finally(() => {
        done();
      });
    }, 2000);
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" backLink noHairline title="资金计划">
        <NavRight className="link">
          <Icons name="add-01" className="svg-icon-26 px-2" onClick={onCreatePlan} />
        </NavRight>
      </Navbar>

      <PageContent className="pt-20" ptr onPtrRefresh={onRefresh}>
        <BlockTitle className="px-6 mx-0 mt-0 mb-0 flex justify-between items-center text-gray-700 text-xl">
          计划中
          <div className="plan-icons flex items-center">
            <Link href="/fund-plan-completed">
              <Icons name="complete-01" className="svg-icon-30 mr-2" />
            </Link>
            {/* <Icons name="overdue-01" className="svg-icon-28 link" /> */}
          </div>
        </BlockTitle>

        <section className="px-4 pt-3">
          <div className="shadow-3 py-3 px-4 rounded-lg ">
            <div className="relative overflow-hidden flex items-center flex-shrink-0">
              <div className="flex items-center">
                <Icons name="statistics-01" className="svg-icon-36 pb-0.5" />
                <span className="pl-0.5 leading-6 font-bold text-lg">预计支出</span>
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

        <List className="swipeout-container pt-2 px-4 my-0">
          {details.map((detail) => {
            const { expense } = detail;
            const hasOverdue = timeStamp(detail.approximateAt) < serverTime;
            const status = hasOverdue ? "overdue-02" : "";

            return (
              <ListItem
                className={`swipeout-item shadow-3 shadow-active-3 rounded-lg mt-7 plant-${detail.seqId}`}
                divider={false}
                swipeout
                key={detail.id}
                onClick={() => {
                  onNavigate(detail.id);
                }}
              >
                <DetailItem
                  slot="title"
                  icon={expense?.expenseIcon}
                  status={status}
                  name={detail.name}
                  type={expense?.expenseName}
                  amounts={thousands(detail.amounts)}
                  date={relative(detail.approximateAt)}
                />
                <SwipeoutActions className="flex items-center" right>
                  <SwipeoutButton
                    color="green"
                    className="swipeout-operation link !text-sm !font-bold"
                    onClick={onCompleteBefore(detail.id, `.plant-${detail.seqId}`)}
                  >
                    完 成
                  </SwipeoutButton>
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
      </PageContent>
    </Page>
  );
};

export default FundPlan;
