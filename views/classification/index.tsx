import React from "react";
import { RouterOpotions } from "typings/f7-route";
import { Page, PageContent, Navbar, NavTitle, Segmented, Button, Tabs, Tab } from "framework7-react";
import { Income, Expenditure } from "./components";

const Classification: React.FC<RouterOpotions> = ({ f7router }) => {
  const onNavigate = (type: string, event?: any) => {
    const id = (event.target as HTMLElement).getAttribute("data-id");

    const url = f7router.generateUrl({
      name: "classification-modify",
      query: { type, id },
      params: {}
    });

    f7router.navigate(url);
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" noHairline backLink>
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
      <PageContent className="pb-0">
        <Tabs animated className="">
          <Tab id="tab-pay" className="overflow-auto">
            <Expenditure f7router={f7router} onNavigate={(event) => onNavigate("pay", event)} />
          </Tab>
          <Tab id="tab-income">
            <Income f7router={f7router} onNavigate={() => onNavigate("income", event)} />
          </Tab>
        </Tabs>
      </PageContent>
    </Page>
  );
};

export default Classification;
