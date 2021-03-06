import React from "react";
import { Icons } from "components";
import { Page, Toolbar, Views, View, Link } from "framework7-react";
import store from "lib/store";

type DashboardOptions = {
  token: string;
};
const Index: React.FC<DashboardOptions> = ({ token }) => {
  // const isDark = useStore("dark");
  const onVibrate = () => {
    const hasVibrate = "vibrate" in navigator;
    hasVibrate && navigator.vibrate(100);
  };

  // useEffect(() => {
  store.dispatch("setToken", token);
  // }, []);
  return (
    <Page pageContent={false}>
      {/* <Toolbar tabbar labels bottom>
        <Link tabLink href="/" routeTabId="tab-home">
          <Icons name="notepad-02" className="toolbar-icon" />
          <span className="tabbar-label tabbar-custom">账簿</span>
        </Link>
        <Link tabLink href="/statistics" routeTabId="tab-statistics">
          <Icons name="statistics" className="toolbar-icon" />
          <span className="tabbar-label tabbar-custom">统计</span>
        </Link>
        <Link tabLink href="/mine" routeTabId="tab-mine">
          <Icons name="mine" className="toolbar-mine-icon" />
          <span className="tabbar-label tabbar-custom">我的</span>
        </Link>
      </Toolbar>
      <Tabs routable>
        <Tab className="page-content" id="tab-home" />
        <Tab className="page-content" id="tab-statistics" />
        <Tab className="page-content" id="tab-mine" />
      </Tabs> */}
      <Views tabs>
        <Toolbar labels tabbar bottom>
          <Link tabLink="#home" tabLinkActive onClick={onVibrate}>
            <Icons name="notepad-02" className="toolbar-icon" />
            <span className="tabbar-label tabbar-custom">账簿</span>
          </Link>
          <Link tabLink="#statistics" onClick={onVibrate}>
            <Icons name="statistics-01" className="toolbar-icon" />
            <span className="tabbar-label tabbar-custom">统计</span>
          </Link>
          <Link tabLink="#mine" onClick={onVibrate}>
            <Icons name="mine" className="toolbar-mine-icon" />
            <span className="tabbar-label tabbar-custom">我的</span>
          </Link>
        </Toolbar>

        <View id="home" tab main tabActive url="/home" />
        <View id="statistics" tab url="/statistics" />
        <View id="mine" tab url="/mine" />
      </Views>
    </Page>
  );
};

export default Index;
