import React, { useEffect } from "react";
import { Page, Navbar, NavRight, Link } from "framework7-react";
import Book from "./components/Book";
import Icons from "components/Icons";
import event from "lib/api/framework-event";

const AccountBook: React.FC = () => {
  useEffect(() => {
    event.on("update-books", () => {
      console.log("jksdfjsdjfk");
    });

    return () => {
      event.off("update-books");
    };
  }, []);
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="我的账簿">
        <NavRight>
          <Link href="/account-book-create">
            <Icons name="add" className="account-book-add-icon px-2" />
          </Link>
        </NavRight>
      </Navbar>

      <div className="grid grid-cols-3 mt-5 px-2">
        <Book name="据了解考虑佳节快乐尽快了解了解" />
        <Book name="据了" />
        <Book name="jlkjljkjlkjlkjljljkjljkj" />
      </div>
    </Page>
  );
};

export default AccountBook;
