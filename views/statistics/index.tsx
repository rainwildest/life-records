import React, { useEffect, useState, useRef, createRef } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavLeft,
  f7ready,
  Popover,
  Subnavbar,
  Segmented,
  Tabs,
  Tab,
  Button,
  Link,
  Popup,
  View
} from "framework7-react";
import { Bar, Pie } from "react-roughviz";
import Icons from "components/Icons";

const Statistics: React.FC = () => {
  const [show, setShow] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const calendar = useRef();
  const textInput = useRef();

  useEffect(() => {
    setShow(!!window);
    const button = document.querySelector("wired-calendar");
    (textInput.current as any).addEventListener("selected", (data: any) => {
      // window.alert(`Hello ${name.value.trim()}!`);
      console.log("kdjksf", data.detail);

      f7ready((f7) => {
        console.log(calendar.current);
        // f7.popover.close(calendar.current.el);
      });
    });
  }, []);

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
          2021-02-03
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
      <Popup
        className="calendar-popup "
        style={{ display: "flex", background: "rgba(0,0,0,0.4)" }}
        opened={popupOpened}
        // onPopupClosed={() => setPopupOpened(false)}
      >
        {/* <div className="absolute w-full h-full flex flex-col justify-center items-center"> */}
        <wired-card
          fill="skyblue"
          class="absolute w-full h-full text-center py-4 flex flex-col justify-center items-center"
        >
          <wired-calendar ref={textInput} />

          <wired-button class="mt-6 relative">
            <div className="w-40" style={{ height: "20px" }}></div>
            <div
              className="absolute w-full h-full top-0 left-0 flex items-center justify-center"
              style={{ background: "white" }}
              onClick={() => setPopupOpened(false)}
            >
              关 闭
            </div>
          </wired-button>
        </wired-card>
        {/* </div> */}
      </Popup>
    </Page>
  );
};

export default Statistics;
