import React from "react";
import { RouterOpotions } from "typings/f7-route";
import { Page, Navbar, NavTitle, Segmented, Button, Tabs, Tab } from "framework7-react";
import Icons from "components/Icons";
import Income from "./components/Income";
import Pay from "./components/Pay";

const Classification: React.FC<RouterOpotions> = ({ f7router }) => {
  const onNavigate = (type: string) => {
    const url = f7router.generateUrl({
      name: "classification-modify",
      params: { type: "type" },
      query: { type }
    });

    f7router.navigate(url);
  };

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
          <Pay f7router={f7router} onNavigate={() => onNavigate("pay")} />
        </Tab>
        <Tab id="tab-income">
          <Income f7router={f7router} onNavigate={() => onNavigate("income")} />
        </Tab>
      </Tabs>
    </Page>
  );
};

export default Classification;
