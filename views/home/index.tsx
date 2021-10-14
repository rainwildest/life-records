import React, { memo, useState, useCallback, useEffect } from "react";
import {
  Page,
  PageContent,
  Link,
  Navbar,
  NavRight,
  Fab,
  useStore,
  NavLeft
} from "framework7-react";
import Icons from "components/Icons";
import { useDetailsQuery } from "apollo/graphql/model/statistics.graphql";
import CostCard from "components/CostCard";
import { relative } from "lib/api/dayjs";
import store from "lib/store";

const Home: React.FC = () => {
  // const { loading, data } = useSameDayQuery();
  const token = useStore("token");

  const { loading, data, refetch } = useDetailsQuery({
    // fetchPolicy: "no-cache"
  });
  const statistics = data?.statisticalDetails || {};

  const [logged, setLogged] = useState(!!token);
  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log("home token", token);
    if (!token) return;

    setLogged(!!token);
  }, [token]);

  return (
    <Page pageContent={false}>
      <Navbar noHairline large transparent>
        <NavRight>
          <Link href="/bill">
            <Icons name="bill" className="notepad-icon" />
          </Link>

          <div className="grid grid-cols-1 pl-4">
            <Icons
              name="moon"
              className="theme-moon row-span-1-2 col-span-1-2"
            />
            {/* <Icons name="sunlight" className="row-span-1-2 col-span-1-2" /> */}
          </div>
        </NavRight>
      </Navbar>
      <PageContent
        ptr
        onPtrRefresh={(done) => {
          if (!logged) return done();
          setTimeout(() => {
            // refetch();
            done();
          }, 2000);
        }}
      >
        {!!logged && (
          <div className="pt-2 px-6 mb-10">
            <div className="shadow-3 p-4 rounded-lg text-xs text-right font-bold">
              <span>今日收入：{statistics.income || 0}</span>
              <span className="pl-4">今日支出：{statistics.pay || 0}</span>
            </div>
            {statistics.details?.map((detail, index) => (
              <CostCard
                key={detail.id}
                incomeTitle="今日收入"
                payTitle="今日支出"
                useMarginTop14={!index}
                type={detail.expense.expenseType}
                typeName={detail.expense.expenseName}
                time={relative(detail.purchaseTime)}
                amount={detail.expensePrice}
                remarks={detail.remarks}
              />
            ))}
          </div>
        )}

        <div style={{ height: "1000px" }}></div>
      </PageContent>
      {!logged && (
        <section className="w-full absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center z-50">
          <img
            className="w-80 h-80 object-contain"
            src="/images/menhera-01.webp"
          />
          <section className="text-sm text-gray-700">
            还没登录呢，
            <Link href="/login" className="text-blue-600">
              去登录吧(づ◡ど)
            </Link>
          </section>
        </section>
      )}

      <Fab
        position="right-bottom"
        slot="fixed"
        text=""
        color="white"
        href="/book-keeping"
      >
        <Icons name="notepad-01" className="row-span-1-2 col-span-1-2" />
      </Fab>
    </Page>
  );
};

export default memo(Home);
