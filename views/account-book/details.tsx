import React from "react";
import { Page, Navbar } from "framework7-react";

const Details: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="账簿详情"></Navbar>
    </Page>
  );
};

export default Details;
