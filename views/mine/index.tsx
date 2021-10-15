import React, { memo } from "react";
import { Page, PageContent, Link, Navbar, NavRight } from "framework7-react";
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
      <PageContent></PageContent>
    </Page>
  );
};

export default memo(Mine);
