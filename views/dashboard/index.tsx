import React from "react";
import Icons from "components/Icons";
// App.jsx
import { Page, Toolbar, Tabs, Tab, Link } from "framework7-react";

const Index: React.FC = () => {
  return (
    <Page pageContent={false}>
      <Toolbar tabbar labels bottom>
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
      </Tabs>
    </Page>
  );
};

export default Index;
