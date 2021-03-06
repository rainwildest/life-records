import React, { useState, memo } from "react";
import { Page, PageContent, Link, useStore } from "framework7-react";
import { Icons } from "components";
import { MineDetails } from "./components";
import request from "lib/apis/request";
import store from "lib/store";

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
      <PageContent>
        <MineDetails />

        <div className="p-2.5 grid mt-10 gap-3 grid-cols-3 rounded-lg mx-4 shadow-3">
          <Link href="/setting" className="block m-0 text-center p-2 rounded-lg shadow-2 shadow-active-2 no-active-state">
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">设置</div>
          </Link>
          <Link href="/bind-account" className="block m-0 text-center p-2 rounded-lg shadow-2 shadow-active-2 no-active-state">
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">绑定账号</div>
          </Link>
          <Link href="/account-book" className="block m-0 text-center p-2 rounded-lg shadow-2 shadow-active-2 no-active-state">
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">我的账簿</div>
          </Link>
          <Link href="/budget" className="block m-0 text-center p-2 rounded-lg shadow-2 shadow-active-2 no-active-state">
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">预算中心</div>
          </Link>
          <Link href="/fund-plan" className="block m-0 text-center p-2 rounded-lg shadow-2 shadow-active-2 no-active-state">
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">资金计划</div>
          </Link>
          <Link href="/classification" className="block m-0 text-center p-2 rounded-lg shadow-2 shadow-active-2 no-active-state">
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">分类管理</div>
          </Link>
        </div>

        <div className="p-2.5 grid gap-3 grid-cols-3 rounded-lg mx-4 my-8 shadow-3">
          <Link
            href="/about"
            className="block m-0 text-center p-2 rounded-lg select-none shadow-2 shadow-active-2 no-active-state"
          >
            <Icons slot="media" name="moon" className="svg-icon-28" />
            <div className="text-xs">关于</div>
          </Link>
          {!!token && (
            <div
              className="link block m-0 text-center p-2 rounded-lg select-none shadow-2 shadow-active-2 no-active-state"
              onClick={onSignOut}
            >
              {!requesting && <Icons slot="media" name="moon" className="svg-icon-28" />}
              {requesting && <Icons slot="after" name="spinner" className="setting-after-icon svg-icon-28 animate-spin" />}
              <div className="text-xs">退出</div>
            </div>
          )}
        </div>
      </PageContent>
    </Page>
  );
};

export default memo(Mine);
