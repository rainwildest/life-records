import React, { memo, useState, useCallback, useEffect } from "react";
import {
  Page,
  PageContent,
  Link,
  Navbar,
  NavRight,
  Fab,
  useStore
} from "framework7-react";
import { useDetailsQuery } from "apollo/graphql/model/statistics.graphql";
import { relative } from "lib/api/dayjs";
import Icons from "components/Icons";
import CostCard from "components/CostCard";
import NotloggedIn from "components/NotloggedIn";
import ThemeIcon from "components/ThemeIcon";

const Home: React.FC = () => {
  // const { loading, data } = useSameDayQuery();
  const token = useStore("token");

  const { loading, data, refetch } = useDetailsQuery();
  const statistics = data?.statisticalDetails || {};

  /* 强制刷新 */
  // const [, updateState] = useState<any>();
  // const forceUpdate = useCallback(() => updateState({}), []);

  const [isDark, setIsDark] = useState(false);
  return (
    <Page pageContent={false}>
      <Navbar noHairline large transparent>
        <NavRight>
          <Link href="/bill">
            <Icons name="bill" className="notepad-icon" />
          </Link>

          <ThemeIcon
            dark={isDark}
            onToggle={() => {
              setIsDark(!isDark);
            }}
          />
        </NavRight>
      </Navbar>
      <PageContent
        ptr
        onPtrRefresh={(done) => {
          if (!token) return done();
          setTimeout(() => {
            // refetch();
            done();
          }, 2000);
        }}
      >
        {!!token && (
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
      {!token && <NotloggedIn />}

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
