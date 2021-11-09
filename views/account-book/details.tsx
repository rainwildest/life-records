import React from "react";
import { Page, Navbar } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";

const Details: React.FC<RouterOpotions> = ({ f7route }) => {
  console.log(f7route.query);
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="账簿详情"></Navbar>
    </Page>
  );
};

export default Details;
