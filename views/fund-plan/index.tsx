import React from "react";
import {
  Page,
  Navbar,
  NavRight,
  Subnavbar,
  Segmented,
  Button,
  Tabs,
  Tab,
  useStore
} from "framework7-react";
import Icons from "components/Icons";
import { relative } from "lib/api/dayjs";
import Completed from "./components/Completed";
import Planned from "./components/Planned";
import Overdue from "./components/Overdue";

const FundPlan: React.FC = () => {
  const token = useStore("token");

  console.log(relative("2021-11-30"), new Date(0).getDate());
  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink noHairline title="资金计划">
        <NavRight>
          <Icons name="add" className="account-book-add-icon link px-2" />
        </NavRight>

        <Subnavbar className="px-5">
          <Segmented strong>
            <Button tabLink="#planned" tabLinkActive>
              计划中
            </Button>
            <Button tabLink="#plan-completed">已完成</Button>
            <Button tabLink="#overdue-plan">已逾期</Button>
          </Segmented>
        </Subnavbar>
      </Navbar>

      <Tabs>
        <Tab className="page-content" id="planned" tabActive>
          {!!token && <Planned />}
        </Tab>
        <Tab className="page-content" id="plan-completed">
          {!!token && <Completed />}
        </Tab>
        <Tab className="page-content" id="overdue-plan">
          {!!token && <Overdue />}
        </Tab>
      </Tabs>
    </Page>
  );
};

export default FundPlan;
