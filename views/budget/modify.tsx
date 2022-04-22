import React from "react";
import { Page, PageContent, Navbar, NavRight, BlockTitle } from "framework7-react";

const Modify: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar className="h-12" noHairline backLink title="新增预算"></Navbar>
      <PageContent></PageContent>
    </Page>
  );
};

export default Modify;
