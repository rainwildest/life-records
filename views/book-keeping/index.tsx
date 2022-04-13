import React, { useRef, useState, useEffect } from "react";
import { Page, Navbar, NavTitle, NavRight, Segmented, Button, Tabs, Tab, PageContent, f7, Link } from "framework7-react";
import { format, toISOString } from "lib/api/dayjs";
import { useCreateCostDetailMutation } from "apollo/graphql/model/cost-details.graphql";
import Pay from "./components/Pay";
import Income from "./components/Income";
import Calc from "components/Calc";
import Icons from "components/Icons";
import CalendarPopup from "components/CalendarPopup";
import event from "lib/api/framework-event";

const Bookkeeping: React.FC = () => {
  const expense = useRef({});
  const expenseType = useRef("pay");
  const bookId = useRef("");

  const [bookName, setBookName] = useState("");
  const [popupOpened, setPopupOpened] = useState(false);
  const [date, setDate] = useState(format(new Date()));

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

    const sameDay = format(toISOString(new Date()));
    const purchaseTime = date === sameDay ? toISOString(new Date()) : `${date} 00:00:00`;

    createCostDetailMutation({
      variables: {
        input: {
          purchaseTime,
          expenseId: expenseId,
          amounts: value.amounts,
          remarks: value.remarks,
          bookId: bookId.current
        }
      }
    })
      .then(() => {
        if (clear) {
          clear();

          setBookName("");
          bookId.current = "";
        }
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

  useEffect(() => {
    event.on("update-books", (id: string, name: string) => {
      setBookName(name);
      bookId.current = id;
    });
  }, []);

  return (
    <Page noToolbar pageContent={false}>
      <Navbar noHairline backLink>
        <NavTitle>
          <Segmented strong className="w-44">
            <Button tabLink="#tab-pay" tabLinkActive data-type="pay" onClick={onGetAttribute}>
              支出
            </Button>
            <Button tabLink="#tab-income" data-type="income" onClick={onGetAttribute}>
              收入
            </Button>
          </Segmented>
        </NavTitle>
        <NavRight className="link">
          <Link href="/book-select">
            <Icons name="ancient-books" className="svg-icon-26 px-2" />
          </Link>
        </NavRight>
      </Navbar>
      <PageContent className="pb-0">
        <div className="flex flex-col h-full">
          <Tabs animated className="mt-3 mb-1">
            <Tab id="tab-pay" className="overflow-auto">
              <Pay onSelected={onSelected} />
            </Tab>
            <Tab id="tab-income">
              <Income onSelected={onSelected} />
            </Tab>
          </Tabs>

          <div className="px-3 pb-2">
            <Calc date={date} onClickCalendar={onClickCalendar} bookName={bookName} onConfirm={onCalcConfirm} />

            <CalendarPopup popupOpened={popupOpened} value={date} onCancel={onCalendarCancel} onConfirm={onCalendarConfirm} />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Bookkeeping;
