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
  BlockTitle,
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
    <Page noToolbar pageContent={true}>
      <Navbar backLink noHairline title="资金计划">
        <NavRight>
          <Icons name="add" className="account-book-add-icon link px-2" />
        </NavRight>

        {/* <Subnavbar className="px-3">
          <Segmented strong>
            <Button tabLink="#planned" tabLinkActive>
              计划中
            </Button>
            <Button tabLink="#plan-completed">已完成</Button>
            <Button tabLink="#overdue-plan">已逾期</Button>
          </Segmented>
        </Subnavbar> */}
      </Navbar>

      <BlockTitle className="px-6 mx-0 mt-10 mb-0 flex justify-between items-center text-gray-700 text-xl">
        计划中
        <div className="plan-icons flex items-center">
          <Icons name="complete-01" className="complete-icon link mr-2" />
          <Icons name="overdue-01" className="overdue-icon link" />
        </div>
      </BlockTitle>
      <Planned />
      {/* <Tabs>
        <Tab className="page-content" id="planned" tabActive>
          {!!token && <Planned />}
        </Tab>
        <Tab className="page-content" id="plan-completed">
          {!!token && <Completed />}
        </Tab>
        <Tab className="page-content" id="overdue-plan">
          {!!token && <Overdue />}
        </Tab>
      </Tabs> */}
    </Page>
  );
};

export default FundPlan;
