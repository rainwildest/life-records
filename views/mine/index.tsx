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
      <Navbar large noHairline>
        <NavRight>
          <Link href="/bill">
            <Icons name="bill" className="notepad-icon" />
          </Link>

          <div className="grid grid-cols-1 pl-4">
            <Icons
              name="moon"
              className="theme-moon row-span-1-2 col-span-1-2"
            />
            {/* <Icons name="sunlight" className="row-span-1-2 col-span-1-2" /> */}
          </div>
        </NavRight>
      </Navbar>
      <PageContent>
        <List className="mine-setting" inset>
          <ListItem link="#" title="Ivan Petrov" after="CEO">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
          <ListItem link="#" title="John Doe" after="Cleaner">
            <Icons slot="media" name="moon" className="mine-setting-icon" />
          </ListItem>
          <ListItem link="#" title="Jenna Smith">
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
        <div style={{ height: "1000px" }}></div>
      </PageContent>
    </Page>
  );
};

export default memo(Mine);
