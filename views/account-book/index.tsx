import React, { useEffect } from "react";
import { Page, Navbar, NavRight, Link } from "framework7-react";
import Book from "./components/Book";
import Icons from "components/Icons";
import event from "lib/api/framework-event";
import { RouterOpotions } from "typings/f7-route";
import { useAccountBooksQuery } from "apollo/graphql/model/account-books.graphql";

const AccountBook: React.FC<RouterOpotions> = ({ f7router }) => {
  const { data, refetch } = useAccountBooksQuery();

  const books = data?.accountBooks || [];
  useEffect(() => {
    event.on("update-books", () => {
      refetch();
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
        {books.map((item) => (
          <Book
            id={item.id}
            name={item.name}
            f7router={f7router}
            key={item.id}
          />
        ))}
      </div>
    </Page>
  );
};

export default AccountBook;
