import React, { useState } from "react";
import { Page, Navbar, List, ListItem, Toggle } from "framework7-react";
import { Icons } from "components";

const Setting: React.FC = () => {
  const hasVibrate = "vibrate" in navigator;
  const [toggle, setToggle] = useState(true);

  return (
    <Page noToolbar>
      <Navbar className="h-12" backLink noHairline title="设置" />
      {/* <img src="/images/3.png" alt="" /> */}
      <List className="text-sm" inset>
        <ListItem title="关闭震动" disabled={!hasVibrate}>
          <Icons slot="media" name="vibrate" className="svg-icon-28" />
          <Toggle
            className="h-4"
            checked={toggle}
            // onToggleChange={onToggleChange}
          />
        </ListItem>
        <ListItem link="#" title="暗夜主题" after="关闭">
          <Icons slot="media" name="dark-theme" className="svg-icon-28" />
        </ListItem>
      </List>
    </Page>
  );
};

export default Setting;
