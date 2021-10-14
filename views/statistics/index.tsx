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
import CalendarPopup from "components/CalendarPopup";
import Generalization from "./components/Generalization";
import Expenditure from "./components/Expenditure";
import Income from "./components/Income";
import DatePicker, { formatDatePicker } from "components/DatePicker";
import store from "lib/store";
import { RouterOpotions } from "typings/f7-route";
const Statistics: React.FC<RouterOpotions> = ({ f7router }) => {
  const token = useStore("token");
  const [popupOpened, setPopupOpened] = useState(false);
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

  useEffect(() => {
    console.log("kjksdf");
    if (!token) return;
    forceUpdate();
  }, [token]);

  const openPicker = () => picker.open();

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

      <Tabs swipeable>
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

      <CalendarPopup
        value={date}
        popupOpened={popupOpened}
        onCancel={() => {
          setPopupOpened(false);
        }}
        onConfirm={(time) => {
          setDate(time);
          setPopupOpened(false);
        }}
      />

      {!token && (
        <section className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center z-50">
          <img
            className="w-80 h-80 object-contain"
            src="/images/menhera-01.webp"
          />
          <section className="text-sm text-gray-700">
            还没登录呢，
            <Link href="/login" className="text-blue-600">
              去登录吧(づ◡ど)
            </Link>
          </section>
        </section>
      )}
    </Page>
  );
};

export default memo(Statistics);
