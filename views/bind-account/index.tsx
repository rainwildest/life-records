import React, { useState, memo } from "react";
import { Page, Navbar, List, ListItem } from "framework7-react";
import Icons from "components/Icons";
const BindAccount: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar noHairline title="绑定账号" backLink />
      <List className="text-sm" inset>
        <ListItem link="#" title="邮箱" after="rainwildest@163.com">
          <Icons slot="media" name="email" className="svg-icon-28" />
        </ListItem>
        <ListItem link="#" title="手机号码" after="152****8888">
          <Icons slot="media" name="iphone-x" className="svg-icon-28" />
        </ListItem>
        <ListItem link="#" title="Github" after="已绑定">
          <Icons slot="media" name="github" className="svg-icon-28" />
        </ListItem>
        <ListItem link="#" title="Google" after="已绑定">
          <Icons slot="media" name="google" className="svg-icon-28" />
        </ListItem>
      </List>
    </Page>
  );
};

export default BindAccount;
