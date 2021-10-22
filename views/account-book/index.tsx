import React from "react";
import { Page, Navbar } from "framework7-react";
const AccountBook: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="我的账本"></Navbar>
    </Page>
  );
};

export default AccountBook;
