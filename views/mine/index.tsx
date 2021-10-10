import React from "react";
import { Page, Navbar } from "framework7-react";

const Mine: React.FC = () => {
  return (
    <Page>
      <Navbar title="我的" large titleLarge="我的"></Navbar>
      <div style={{ height: "1000px" }}></div>
    </Page>
  );
};

export default Mine;
