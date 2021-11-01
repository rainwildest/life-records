import React from "react";
import { Page, Navbar } from "framework7-react";
import Icons from "components/Icons";
const Budget: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="预算中心"></Navbar>

      <div className="pt-2 px-6 mb-10 mt-6">
        <div className="shadow-3 rounded-lg py-2 px-4 flex justify-between">
          <div className="flex items-center flex-shrink-0 text-sm">
            <Icons name="moon" />
            生活费
          </div>

          <div
            className="inset-shadow-3 rounded-lg"
            style={{ minWidth: "50px" }}
          ></div>
        </div>
      </div>
    </Page>
  );
};

export default Budget;
