import React, { useEffect, useState, useRef, createRef } from "react";
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
import { format } from "lib/api/utils";

const Statistics: React.FC = () => {
  const [date, setDate] = useState(format(new Date()));
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <Page pageContent={false}>
      {/* <NavLeft>
          <div>
            <Link popupOpen=".calendar-popup">2021-12-03</Link>
          </div>
        </NavLeft> */}
      <Navbar>
        {/* <NavTitle>
          <div>2021-02-03</div>
        </NavTitle> */}
        <div
          className="w-full h-full absolute left-0 top-0 flex justify-center items-center font-bold"
          onClick={() => setPopupOpened(true)}
        >
          {date}
        </div>
        <Subnavbar>
          <Segmented strong>
            <Button tabLink="#generalization" tabLinkActive>
              概览
            </Button>
            <Button tabLink="#tab2">支出分析</Button>
            <Button tabLink="#tab3">收入分析</Button>
            <Button tabLink="#tab4">预算统计</Button>
          </Segmented>
        </Subnavbar>
      </Navbar>

      <Tabs animated>
        <View tab id="generalization" tabActive url="/generalization/" />
        <View tab id="tab2" />
        <View tab id="tab3" />
        <View tab id="tab4" />
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

export default Statistics;
