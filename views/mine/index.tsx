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

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log("home token", token);
  }, [token]);

  return (
    <Page pageContent={false}>
      <Navbar noHairline>
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
      <PageContent></PageContent>
    </Page>
  );
};

export default memo(Home);
