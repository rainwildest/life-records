import React from "react";
import { Page, Navbar } from "framework7-react";
import Icons from "components/Icons";

const Classification: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="分类管理"></Navbar>

      <div className="pt-2 px-6 mb-10 mt-10">
        {/* <div className="budget-title shadow-3 link rounded-lg py-3 px-4 flex items-center flex-shrink-0 text-sm">
          <Icons name="budget" className="budget-icon pr-3" />
          <div className="truncate text-gray-700">预算总金额</div>
        </div> */}
        <div className="shadow-3 rounded-lg py-3 px-4 flex items-center">
          <Icons name="budget" className="budget-icon pr-3" />
          <div className="truncate text-gray-700">预算总金额</div>
        </div>
      </div>
    </Page>
  );
};

export default Classification;
