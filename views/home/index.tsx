import React, { memo, useState, useCallback } from "react";
import { Page, PageContent, Link, Navbar, NavRight, Fab, useStore } from "framework7-react";
import { useDetailsQuery } from "apollo/graphql/model/statistics.graphql";
import { Amounts, Icons, CostCard, NotloggedIn, ThemeIcon } from "components";
import { relative } from "lib/api/dayjs";
import { thousands } from "lib/api/utils";

const Home: React.FC = () => {
  const token = useStore("token");

  const { data, refetch } = useDetailsQuery();
  const statistics = data?.statisticalDetails || {};
  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <Page pageContent={false}>
      <Navbar noHairline large transparent>
        <NavRight>
          <Link href="/bill">
            <Icons name="bill" className="notepad-icon" />
          </Link>

          <ThemeIcon />
        </NavRight>
      </Navbar>
      <PageContent
        ptr
        onPtrRefresh={(done) => {
          if (!token) return done();
          setTimeout(() => {
            refetch();
            forceUpdate();
            done();
          }, 500);
        }}
      >
        {!!token && (
          <div className="pt-2 px-6 mb-10">
            <Amounts
              incomTitle="今日收入"
              payTitle="今日支出"
              income={thousands(statistics.income)}
              pay={thousands(statistics.pay)}
            />

            {statistics.details?.map((detail, index) => (
              <CostCard
                key={detail.id}
                type={detail.expense.expenseType}
                typeName={detail.expense.expenseName}
                time={relative(detail.purchaseTime)}
                amounts={thousands(detail.amounts)}
                remarks={detail.remarks}
                className="mt-8"
              />
            ))}
          </div>
        )}
      </PageContent>
      {!token && <NotloggedIn />}

      <Fab position="right-bottom" slot="fixed" text="" color="white" href="/book-keeping">
        <Icons name="notepad-01" className="row-span-1-2 col-span-1-2" />
      </Fab>
    </Page>
  );
};

export default memo(Home);
