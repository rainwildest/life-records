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

  return (
    <Page pageContent={false}>
      {/* <Navbar noHairline className="mine-nav-color">
        <NavRight></NavRight>
      </Navbar> */}
      <PageContent>
        <MineDetails />

        <div className="bg-white p-3 grid gap-2 grid-cols-3 rounded-lg mx-4">
          <Link className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">设置</div>
          </Link>
          <Link className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">绑定账号</div>
          </Link>
          <Link className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">我的账本</div>
          </Link>
          <Link className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">预算</div>
          </Link>
          <Link className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">资金计划</div>
          </Link>
          <Link className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">分类管理</div>
          </Link>
        </div>

        <div className="bg-white p-3 grid gap-2 grid-cols-3 rounded-lg mx-4 mt-8">
          <Link href="/about" className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">关于</div>
          </Link>
          <Link href="#" className="block m-0 text-center p-1 rounded-lg">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
            <div className="text-xs">退出</div>
          </Link>
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
