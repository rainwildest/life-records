import React from "react";
import { Page, Navbar, NavTitle, Segmented, Button, Tabs, Tab } from "framework7-react";
import Icons from "components/Icons";
import Income from "./components/Income";
import Pay from "./components/Pay";

const Classification: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar noHairline backLink>
        <NavTitle>
          <Segmented strong className="w-44">
            <Button tabLink="#tab-pay" tabLinkActive data-type="pay">
              支出
            </Button>
            <Button tabLink="#tab-income" data-type="income">
              收入
            </Button>
          </Segmented>
        </NavTitle>
      </Navbar>

      <Tabs animated className="">
        <Tab id="tab-pay" className="overflow-auto">
          <Pay />
        </Tab>
        <Tab id="tab-income">
          <Income />
        </Tab>
      </Tabs>
    </Page>
  );
};

export default Classification;
