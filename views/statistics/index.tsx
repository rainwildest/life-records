import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { Page, Navbar, Subnavbar, Segmented, Tabs, Tab, Button, Link, useStore } from "framework7-react";
import store from "lib/store";
import Generalization from "./components/Generalization";
import Expenditure from "./components/Expenditure";
import Income from "./components/Income";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import NotloggedIn from "components/NotloggedIn";
import SheetModalPicker from "./SheetModalPicker";
import { RouterOpotions } from "typings/f7-route";

const Statistics: React.FC<RouterOpotions> = ({ f7router }) => {
  const token = useStore("token");
  const picker = useRef(null);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [date, setDate] = useState("");

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (!window) return;
    const _picker = DatePicker({ hasFullYear: false }, (e) => {
      setDate(e);
    });
    setDate(formatDatePicker((_picker?.value as string[]) || []));

    picker.current = _picker;
  }, []);

  const openPicker = token && (() => picker.current.open());

  return (
    <Page pageContent={false}>
      <Navbar noHairline>
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
        <Tab className="page-content" id="generalization" tabActive>
          {!!token && <Generalization year={date.split("-")[0]} />}
        </Tab>
        <Tab className="page-content" id="expenditure">
          {!!token && <Expenditure date={date} />}
        </Tab>
        <Tab className="page-content" id="income">
          {!!token && <Income date={date} />}
        </Tab>
      </Tabs>

      {!token && <NotloggedIn className="h-full" />}
      <SheetModalPicker
        sheetOpened={sheetOpened}
        onCloseSheet={() => {
          setSheetOpened(false);
        }}
        onConfirm={(e) => {
          console.log(e);
          setDate(e);
        }}
      />
    </Page>
  );
};

export default memo(Statistics);
