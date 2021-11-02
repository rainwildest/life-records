import React from "react";
import { Page, Navbar, BlockTitle } from "framework7-react";
import Icons from "components/Icons";

const Budget: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="预算中心"></Navbar>

      <div className="pt-2 px-6 mb-10 mt-10">
        <BlockTitle className="mx-0 mt-0 mb-7 text-gray-700 text-xl">
          十月<span className="px-1">·</span>月预算
        </BlockTitle>
        <div className="shadow-3 rounded-lg py-3 px-4 flex justify-between">
          <div className="budget-title flex items-center flex-shrink-0 text-sm">
            <Icons name="budget" className="budget-icon pr-2" />
            <div className="truncate text-gray-700">预算总金额</div>
          </div>

          <div className="shadow-3 rounded-lg w-24 h-10 flex items-center justify-center px-3 py-2 box-border text-sm overflow-hidden">
            <div className="text-gray-700">100</div>
          </div>
        </div>

        <div className="shadow-3 rounded-lg py-3 px-4 mt-10 flex justify-between">
          <div className="budget-title flex items-center flex-shrink-0 text-sm">
            <Icons name="moon" className="budget-icon pr-2" />
            <div className="truncate text-gray-700">生活费</div>
          </div>

          <div className="inset-shadow-3 rounded-lg inline-block">
            <input
              className=" w-24 h-10 text-sm box-border px-3 py-2 text-center text-gray-700 bg-transparent"
              placeholder="无预算"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Budget;
