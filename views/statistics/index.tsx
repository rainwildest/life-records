import React, { useEffect, useState, memo } from "react";
import {
  Page,
  Navbar,
  Subnavbar,
  Segmented,
  Tabs,
  Tab,
  Button
} from "framework7-react";
import CalendarPopup from "components/CalendarPopup";
import Generalization from "./components/Generalization";
import Expenditure from "./components/Expenditure";
import Income from "./components/Income";
import DatePicker, { formatDatePicker } from "components/DatePicker";

const Statistics: React.FC = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const [date, setDate] = useState("");
  const [picker, setPicker] = useState(null);

  useEffect(() => {
    if (!window) return;
    const picker = DatePicker({ hasFullYear: false }, (e) => {
      setDate(e);
    });
    setDate(formatDatePicker((picker?.value as string[]) || []));
    setPicker(picker);
  }, []);

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
        <Tab id="generalization" tabActive>
          <Generalization year={date.split("-")[0]} />
        </Tab>
        <Tab id="expenditure">
          <Expenditure date={date} />
        </Tab>
        <Tab id="income">
          <Income date={date} />
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
    </Page>
  );
};

export default memo(Statistics);
