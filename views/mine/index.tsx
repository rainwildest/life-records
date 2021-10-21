import React, { useState, memo, useEffect } from "react";
import {
  Page,
  PageContent,
  Link,
  Navbar,
  NavRight,
  List,
  ListItem,
  Icon,
  useStore
} from "framework7-react";
import request from "lib/api/request";
import store from "lib/store";
import Icons from "components/Icons";
import MineDetails from "./components/MineDetails";

const Mine: React.FC = () => {
  const token = useStore("token");
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
        }
      });
    }, 1000 * 0.5);
  };

  return (
    <Page pageContent={false}>
      {/* <Navbar noHairline className="mine-nav-color">
        <NavRight></NavRight>
      </Navbar> */}
      <PageContent>
        <MineDetails />

        <div className="p-3 grid mt-10 gap-3 grid-cols-3 rounded-lg mx-4 shadow-3">
          <Link className="block m-0 text-center p-2 rounded-lg shadow-2">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">设置</div>
          </Link>
          <Link className="block m-0 text-center p-2 rounded-lg shadow-2">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">绑定账号</div>
          </Link>
          <Link className="block m-0 text-center p-2 rounded-lg shadow-2">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">我的账本</div>
          </Link>
          <Link className="block m-0 text-center p-2 rounded-lg shadow-2">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">预算</div>
          </Link>
          <Link className="block m-0 text-center p-2 rounded-lg shadow-2">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">资金计划</div>
          </Link>
          <Link className="block m-0 text-center p-2 rounded-lg shadow-2">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">分类管理</div>
          </Link>
        </div>

        <div className="p-3 grid gap-3 grid-cols-3 rounded-lg mx-4 my-8 shadow-3">
          <Link
            href="/about"
            className="block m-0 text-center p-2 rounded-lg shadow-2"
          >
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">关于</div>
          </Link>
          {!!token && (
            <Link
              href="#"
              className="block m-0 text-center p-2 rounded-lg shadow-2"
              onClick={onSignOut}
            >
              {!requesting && (
                <Icons slot="media" name="moon" className="mine-setting-icon" />
              )}
              {requesting && (
                <Icons
                  slot="after"
                  name="spinner"
                  className="setting-after-icon animate-spin"
                />
              )}
              <div className="text-xs">退出</div>
            </Link>
          )}
        </div>
        {/* <List inset>
          <ListItem link="/setting" title="设置">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
          <ListItem link="/setting" disabled title="我的账本">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
          <ListItem link="/setting" disabled title="分类管理">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
        </List>

        <List inset>
          <ListItem link="/about" title="关于">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
        </List> */}
      </PageContent>
    </Page>
  );
};

export default memo(Mine);
