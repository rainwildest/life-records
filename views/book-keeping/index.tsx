import React, { useRef, useState } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  Segmented,
  Button,
  Tabs,
  Tab,
  PageContent,
  f7
} from "framework7-react";
import { format } from "lib/api/dayjs";
import { useCreateCostDetailMutation } from "apollo/graphql/model/cost-details.graphql";
import Pay from "./components/Pay";
import Income from "./components/Income";
import Calc from "components/Calc";
import CalendarPopup from "components/CalendarPopup";

const Bookkeeping: React.FC = () => {
  const expense = useRef({});
  const expenseType = useRef("pay");
  const [popupOpened, setPopupOpened] = useState(false);
  const [date, setDate] = useState(format(new Date().toISOString()));

  /* 新增消费记录 */
  const [createCostDetailMutation] = useCreateCostDetailMutation();

  const onSelected = (e: { [key: string]: IDSQLOptions }) => {
    Object.keys(e).forEach((type) => {
      expense.current[type] = e[type].id;
    });
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

  const onCalcConfirm = (value, clear) => {
    const type = expenseType.current;
    const expenseId = expense.current[type];

    if (!expenseId) return toastTip("请选择类型");

    const sameDay = format(new Date().toISOString());
    const purchaseTime =
      date === sameDay ? new Date().toISOString() : `${date} 00:00:00`;

    createCostDetailMutation({
      variables: {
        input: {
          purchaseTime,
          expenseId: expenseId,
          amounts: value.amounts,
          remarks: value.remarks
        }
      }
    })
      .then(() => {
        clear && clear();
        toastTip("添加成功");
      })
      .catch(() => {
        toastTip("添加失败");
      });
  };

  const onClickCalendar = () => {
    setPopupOpened(true);
  };

  const onCalendarCancel = () => {
    setPopupOpened(false);
  };

  const onCalendarConfirm = (date) => {
    setDate(date);
    setPopupOpened(false);
  };

  const onGetAttribute = (e) => {
    const type = e.target.getAttribute("data-type");
    expenseType.current = type;
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar noHairline backLink>
        <NavTitle>
          <Segmented strong className="w-36">
            <Button
              tabLink="#tab-pay"
              tabLinkActive
              data-type="pay"
              onClick={onGetAttribute}
            >
              支出
            </Button>
            <Button
              tabLink="#tab-income"
              data-type="income"
              onClick={onGetAttribute}
            >
              收入
            </Button>
          </Segmented>
        </NavTitle>
      </Navbar>
      <PageContent className="pb-0">
        <div className="flex flex-col h-full">
          <Tabs animated className="my-3">
            <Tab id="tab-pay" className="overflow-auto">
              <Pay onSelected={onSelected} />
            </Tab>
            <Tab id="tab-income">
              <Income onSelected={onSelected} />
            </Tab>
          </Tabs>
          <div className="px-4 pb-2">
            <Calc
              date={date}
              onClickCalendar={onClickCalendar}
              onConfirm={onCalcConfirm}
            />

            <CalendarPopup
              popupOpened={popupOpened}
              value={date}
              onCancel={onCalendarCancel}
              onConfirm={onCalendarConfirm}
            />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Bookkeeping;
