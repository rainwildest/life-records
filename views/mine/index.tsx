import React, { useState, memo } from "react";
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

const Mine: React.FC = () => {
  const [requesting, setRequesting] = useState(false);
  const token = useStore("token");

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
        <div className="mine-bg-color w-full h-48 mb-32">
          <div className="mine-container p-5 mx-auto rounded-lg relative bg-white flex flex-col">
            <div className="flex-1 flex items-center">
              <div className="mine-avatar w-16 h-16 rounded-full mr-5 bg-gray-100 flex items-center justify-center overflow-hidden">
                <Icons name="moon" />
              </div>

              <section>
                <div className="text-xl font-bold">rainwildest</div>
                <div className="text-sm font-medium">rainwildest@163.com</div>
              </section>
            </div>
            <div className="grid grid-cols-3 mt-6">
              <section>
                <span className="block my-0 text-center font-bold text-lg">
                  20
                </span>
                <span className="block my-0 text-center text-gray-400 text-sm">
                  天/元
                </span>
              </section>
              <section>
                <span className="block my-0 text-center font-bold text-lg">
                  20
                </span>
                <span className="block my-0 text-center text-gray-400 text-sm">
                  月/元
                </span>
              </section>
              <section>
                <span className="block my-0 text-center font-bold text-lg">
                  200
                </span>
                <span className="block my-0 text-center text-gray-400 text-sm">
                  年/元
                </span>
              </section>
            </div>
          </div>
        </div>
        <List inset>
          <ListItem link="#" title="绑定账号">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
        </List>

        {!!token && (
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
        )}

        <List inset>
          <ListItem link="#" title="关于">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
        </List>
      </PageContent>
    </Page>
  );
};

export default memo(Mine);
