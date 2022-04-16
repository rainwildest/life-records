import React from "react";
import { Page, Navbar, NavRight, Button, Popup } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import Icons from "components/Icons";
import event from "lib/api/framework-event";
import { useAccountBooksQuery } from "apollo/graphql/model/account-books.graphql";

const BookSelect: React.FC<RouterOpotions> = ({ f7router }) => {
  const { data, refetch } = useAccountBooksQuery();

  const books = data?.accountBooks || [];

  const onSelect = (e: any) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("data-name");
    const id = target.getAttribute("data-id");

    event.emit("update-books", id, name);

    f7router.back();
  };
  return (
    <Page noToolbar pageContent={true}>
      <Navbar backLink noHairline title="选择账簿">
        <NavRight>
          <Button className="w-20" large small fill data-id="" data-name="" onClick={onSelect}>
            {/* <Icons name={!saving ? "save" : "spinner"} className={`mr-1 save-icon${!saving ? "" : " animate-spin"}`} /> */}
            清除
          </Button>
        </NavRight>
      </Navbar>

      <div className="px-4 pt-7 grid grid-cols-2 gap-3">
        {books.map((item) => {
          return (
            <div
              className="shadow-3 rounded-lg flex py-3 px-2 justify-start items-center shadow-active-3"
              data-id={item.id}
              data-name={item.name}
              onClick={onSelect}
              key={item.id}
            >
              <Icons name="ancient-books" className="scale-80 pointer-events-none" />
              <div className="overflow-hidden pointer-events-none">
                <div className="text-gray-400 text-xs">账簿名称</div>
                <div className="mt-1 break-all text-sm font-semibold text-gray-900 truncate tracking-widest">{item.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default BookSelect;
