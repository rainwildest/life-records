import React, { useState, memo } from "react";
import { Page, Navbar, List, ListItem } from "framework7-react";
import Icons from "components/Icons";
import request from "lib/api/request";
import store from "lib/store";
import { RouterOpotions } from "typings/f7-route";

const Setting: React.FC<RouterOpotions> = ({ f7router }) => {
  const [requesting, setRequesting] = useState(false);

  const onSignOut = () => {
    setRequesting(true);

    setTimeout(() => {
      request({
        url: "/api/auth/signOut",
        method: "GET"
      }).then((val) => {
        const { code, data } = val;
        if (code === 2000) {
          store.dispatch("setToken", null);
          setRequesting(false);

          f7router.back();
        }
      });
    }, 1000 * 0.5);
  };

  return (
    <Page noToolbar>
      <Navbar backLink noHairline></Navbar>
      {/* <img src="/images/3.png" alt="" /> */}
      <List inset>
        <ListItem link="#" title="绑定账号">
          <Icons slot="media" name="moon" className="mine-setting-icon" />
        </ListItem>
        <ListItem link="#" title="绑定账号">
          <Icons slot="media" name="moon" className="mine-setting-icon" />
        </ListItem>
      </List>

      <List inset>
        <ListItem link="#" title="退出" onClick={onSignOut}>
          <Icons slot="media" name="moon" className="mine-setting-icon" />
          {requesting && (
            <Icons
              slot="after"
              name="spinner"
              className="setting-after-icon animate-spin"
            />
          )}
        </ListItem>
      </List>
    </Page>
  );
};

export default Setting;
