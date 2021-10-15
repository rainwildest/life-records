import React, { memo } from "react";
import {
  Page,
  PageContent,
  Link,
  Navbar,
  NavRight,
  List,
  ListItem,
  Icon
} from "framework7-react";
import request from "lib/api/request";
import store from "lib/store";
import Icons from "components/Icons";

const Mine: React.FC = () => {
  return (
    <Page pageContent={false}>
      <Navbar noHairline>
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
            <Icons slot="media" name="moon" />
          </ListItem>
          <ListItem link="#" title="John Doe" after="Cleaner">
            <Icons slot="media" name="moon" />
          </ListItem>
          <ListItem link="#" title="Jenna Smith">
            <Icons slot="media" name="moon" />
          </ListItem>
        </List>

        <List className="mine-setting" inset>
          <ListItem
            link="#"
            title="退出"
            onClick={() => {
              console.log("jsdkfjs");
              request({
                url: "/api/auth/signOut",
                method: "GET"
              }).then((val) => {
                const { code, data } = val;
                if (code === 2000) store.dispatch("setToken", null);
              });
            }}
          >
            <Icons slot="media" name="moon" />
            <div slot="after">jkj</div>
          </ListItem>
        </List>
      </PageContent>
    </Page>
  );
};

export default memo(Mine);
