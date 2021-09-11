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
  PageContent,
  f7
} from "framework7-react";
import { format } from "lib/api/utils";
import { useCreateCostDetailMutation } from "apollo/graphql/model/cost-details.graphql";
import Pay from "./components/Pay";
import Income from "./components/Income";
import Calc from "components/Calc";
import CalendarPopup from "components/CalendarPopup";

const Bookkeeping: React.FC = () => {
  const expenseId = useRef("");
  const [popupOpened, setPopupOpened] = useState(false);
  const [date, setDate] = useState(format(new Date()));

  /* 新增消费记录 */
  const [createCostDetailMutation] = useCreateCostDetailMutation();

  const onSelected = (e: IDSQLOption) => {
    expenseId.current = e.id;
  };

  const toastTip = (text = "") => {
    f7.toast
      .create({
        text,
        position: "center",
        closeTimeout: 2000
      })
      .open();
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink>
        {/* <NavLeft>
          <Link backLink={true}></Link>
        </NavLeft> */}
        <NavTitle>
          <Segmented strong className="w-36">
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
              <Pay onSelected={onSelected} />
            </View>
            <View tab id="income">
              <Income onSelected={onSelected} />
            </View>
          </Tabs>
          <div
            // className="w-full fixed bottom-0 pt-2 px-2"
            className="px-4 pb-2"
            // style={{
            //   backgroundImage: "linear-gradient(120deg, #2193b0 , #6dd5ed)"
            // }}
          >
            <Calc
              date={date}
              onClickCalendar={() => {
                setPopupOpened(true);
              }}
              onConfirm={(value) => {
                if (!expenseId.current) {
                  toastTip("请选择类型");
                  return;
                }

                // console.log({
                //   expenseId: expenseId.current,
                //   expensePrice: value.amounts,
                //   purchaseTime: date,
                //   remarks: value.remarks
                // });

                createCostDetailMutation({
                  variables: {
                    input: {
                      expenseId: expenseId.current,
                      expensePrice: value.amounts,
                      remarks: value.remarks,
                      purchaseTime: date
                    }
                  }
                })
                  .then(() => {
                    toastTip("添加成功");
                  })
                  .catch(() => {
                    toastTip("添加失败");
                  });
              }}
            />

            <CalendarPopup
              popupOpened={popupOpened}
              value={date}
              onCancel={() => {
                setPopupOpened(false);
              }}
              onConfirm={(date) => {
                setDate(date);
                setPopupOpened(false);
              }}
            />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Bookkeeping;
