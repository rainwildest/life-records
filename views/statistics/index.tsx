import React, { useEffect, useState, memo } from "react";
import {
  Page,
  Navbar,
  Subnavbar,
  Segmented,
  Tabs,
  Button,
  View
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
      <Navbar>
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
            {/* <Button tabLink="#tab4">预算统计</Button> */}
          </Segmented>
        </Subnavbar>
      </Navbar>

      <Tabs swipeable>
        <View tab id="generalization" tabActive>
          <Generalization year={date.split("-")[0]} />
        </View>
        <View tab id="expenditure">
          <Expenditure date={date} />
        </View>
        <View tab id="income">
          <Income date={date} />
        </View>
        {/* <View tab id="tab4" /> */}
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
