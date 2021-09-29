import React from "react";
import Icons from "components/Icons";
// App.jsx
import { View, Toolbar, Views, Link } from "framework7-react";

const Index: React.FC = () => {
  return (
    <Views tabs themeDark={false}>
      <Toolbar tabbar labels bottom>
        <Link tabLink="#home" tabLinkActive>
          <Icons name="notepad-02" className="toolbar-icon" />
          <span className="tabbar-label tabbar-custom">账簿</span>
        </Link>
        <Link tabLink="#statistics">
          <Icons name="statistics" className="toolbar-icon" />
          <span className="tabbar-label tabbar-custom">统计</span>
        </Link>
        <Link tabLink="#mine">
          <Icons name="mine" className="toolbar-mine-icon" />
          <span className="tabbar-label tabbar-custom">我的</span>
        </Link>
      </Toolbar>

      <View tab id="home" main tabActive url="/home/" />
      <View tab id="statistics" url="/statistics/" />
      <View tab id="mine" url="/mine/" />
    </Views>
  );
};

export default Index;
