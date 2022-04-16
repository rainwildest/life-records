import React, { useEffect, memo } from "react";
import { Page, Navbar, NavRight } from "framework7-react";
import { Book } from "./components";
import { Icons } from "components";
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

  const onNavigate = () => {
    const url = f7router.generateUrl({
      name: "account-book-modify",
      params: { id: "id", name: "name" },
      query: { id: "", name: "" }
    });
    f7router.navigate(url);
  };

  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="我的账簿">
        <NavRight>
          <Icons name="add" className="link svg-icon-26 px-2" onClick={onNavigate} />
        </NavRight>
      </Navbar>

      <div className="mt-7 px-4">
        {books.map((item) => (
          <Book id={item.id} name={item.name} f7router={f7router} key={item.id} />
        ))}
      </div>
    </Page>
  );
};

export default memo(AccountBook);
