import React, { useEffect, useRef, useState } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Subnavbar,
  Segmented,
  Button,
  Tabs,
  View,
  PageContent
} from "framework7-react";
import Pay from "./pay";
import Calc from "components/Calc";

const Bookkeeping: React.FC = () => {
  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink>
        {/* <NavLeft>
          <Link backLink={true}></Link>
        </NavLeft> */}
        <NavTitle>
          <Segmented strong className="w-32">
            <Button tabLink="#pay" tabLinkActive>
              支出
            </Button>
            <Button tabLink="#income">收入</Button>
          </Segmented>
        </NavTitle>
      </Navbar>
      <PageContent className="pb-0">
        <div className="flex flex-col h-full">
          <Tabs animated className="my-3">
            <View tab id="pay" tabActive className="overflow-auto">
              <Pay />
            </View>
            <View tab id="income" />
          </Tabs>
          <div
            // className="w-full fixed bottom-0 pt-2 px-2"
            className="pt-2 px-2"
            style={{
              backgroundImage: "linear-gradient(120deg, #2193b0 , #6dd5ed)"
            }}
          >
            <Calc
              date="2020-08-30"
              // onClickCalendar={() => {
              //   setPopupOpened(true);
              // }}
              // onConfirm={(value) => {
              //   console.log(value);
              //   createCostDetailMutation({
              //     variables: {
              //       input: {
              //         expenseId: "10000000-0000-0000-0000-000000000004",
              //         expensePrice: 20,
              //         remarks: "",
              //         purchaseTime: new Date()
              //       }
              //     }
              //   })
              //     .then((value) => {
              //       console.log("我完成了", value);
              //     })
              //     .catch((error) => {
              //       console.log(error);
              //     });
              // }}
            />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Bookkeeping;
