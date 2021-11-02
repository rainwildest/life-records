import React, { useEffect, useState, useCallback, Fragment, memo } from "react";
import {
  Page,
  Navbar,
  Subnavbar,
  Segmented,
  Tabs,
  Tab,
  Button,
  Link,
  useStore
} from "framework7-react";
import store from "lib/store";
import Generalization from "./components/Generalization";
import Expenditure from "./components/Expenditure";
import Income from "./components/Income";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import NotloggedIn from "components/NotloggedIn";

import { RouterOpotions } from "typings/f7-route";
const Statistics: React.FC<RouterOpotions> = ({ f7router }) => {
  const token = useStore("token");
  const [date, setDate] = useState("");
  const [picker, setPicker] = useState(null);

  /* 强制刷新 */
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (!window) return;
    const picker = DatePicker({ hasFullYear: false }, (e) => {
      setDate(e);
    });
    setDate(formatDatePicker((picker?.value as string[]) || []));
    setPicker(picker);
  }, []);

  const _picker = () => picker.open();
  const openPicker = token && _picker;

  return (
    <Page pageContent={false}>
      <Navbar noHairline>
        <div
          className="w-full h-full absolute left-0 top-0 flex justify-center items-center font-bold"
          onClick={openPicker}
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
    </Page>
  );
};

export default memo(Statistics);
