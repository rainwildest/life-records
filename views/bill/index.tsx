import React, { useEffect, useState } from "react";
import {
  Page,
  Button,
  Link,
  Navbar,
  NavTitle,
  NavRight,
  f7
} from "framework7-react";
import DatePicker, { formatDatePicker } from "components/DatePicker";

const Bill: React.FC = () => {
  // useEffect(() => {}, []);
  const picker = DatePicker((e) => {
    setDate(e);
  });
  const [date, setDate] = useState(formatDatePicker(picker.value as string[]));

  const openPicker = () => picker.open();
  return (
    <Page noToolbar>
      <Navbar backLink>
        <NavTitle>账单</NavTitle>
        <NavRight>
          <Button className="w-20" large small fill onClick={openPicker}>
            {date}
          </Button>
        </NavRight>
      </Navbar>

      <div style={{ position: "sticky", top: 0, background: "white" }}>
        dfsfs
      </div>
      <div style={{ height: "1000px" }}></div>
      <div style={{ position: "sticky", top: 0, background: "white" }}>121</div>
      <div style={{ height: "1000px" }}></div>
      <div></div>
      <div></div>
    </Page>
  );
};

export default Bill;
