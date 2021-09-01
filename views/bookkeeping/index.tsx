import React, { useEffect, useRef, useState } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Subnavbar,
  Segmented,
  Button,
  Tabs,
  View
} from "framework7-react";
import Pay from "./pay";

const Bookkeeping: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar>
        <NavLeft backLink></NavLeft>
        <NavTitle>账房</NavTitle>
        <Subnavbar>
          <Segmented strong>
            <Button tabLink="#pay" tabLinkActive>
              支出
            </Button>
            <Button tabLink="#income">收入</Button>
          </Segmented>
        </Subnavbar>
      </Navbar>

      <Tabs animated>
        <View tab id="pay" tabActive>
          <Pay />
        </View>
        <View tab id="income" />
      </Tabs>
    </Page>
  );
};

export default Bookkeeping;
