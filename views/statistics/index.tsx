import React, { useState, useCallback, memo } from "react";
import { Page, PageContent, Navbar, Subnavbar, Segmented, Tabs, Tab, Button, useStore } from "framework7-react";
// import store from "lib/store";
import { Income, Generalization, Expenditure } from "./components";
import { SheetDatePicker, NotloggedIn } from "components";
import { getCurrentDate } from "lib/apis/dayjs";

const Statistics: React.FC = () => {
  const token = useStore("token");
  const [sheetOpened, setSheetOpened] = useState(false);

  const [date, setDate] = useState(getCurrentDate("YYYY-MM"));

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const onSheetClosed = () => {
    setSheetOpened(false);
  };

  const onConfirmPicker = (e: string) => {
    setDate(e);
  };

  return (
    <Page pageContent={false}>
      <Navbar className="h-12" noHairline>
        <div
          className=" w-full h-full absolute left-0 top-0 flex justify-center items-center font-bold"
          onClick={() => {
            setSheetOpened(true);
          }}
        >
          {date}
        </div>
        <Subnavbar>
          <Segmented strong>
            <Button tabLink="#generalization" tabLinkActive>
              概览
            </Button>
            <Button tabLink="#expenditure">支出分析</Button>
            <Button tabLink="#income">收入分析</Button>
          </Segmented>
        </Subnavbar>
      </Navbar>

      <Tabs>
        <Tab id="generalization" className="h-full" tabActive>
          {!!token && <Generalization year={date.split("-")[0]} />}
        </Tab>
        <Tab id="expenditure" className="h-full">
          {!!token && <Expenditure date={date} />}
        </Tab>
        <Tab id="income" className="h-full">
          {!!token && <Income date={date} />}
        </Tab>
      </Tabs>

      {!token && <NotloggedIn className="h-full" />}

      <SheetDatePicker
        date={date}
        isCurrnetYear={true}
        isCurrentMonth={true}
        sheetOpened={sheetOpened}
        onSheetClosed={onSheetClosed}
        onConfirm={onConfirmPicker}
      />
    </Page>
  );
};

export default memo(Statistics);
