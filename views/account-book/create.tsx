import React, { useState } from "react";
import { Page, Navbar, NavRight, useStore, Button } from "framework7-react";
import Book from "./components/Book";
import Icons from "components/Icons";
import { debounce } from "lodash";
const AccountBook: React.FC = () => {
  const [name, setName] = useState("");
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="新增账本"></Navbar>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
        <div className="flex justify-center mt-10">
          <Book name={name} />
        </div>

        <div className="mt-8">
          <div className="relative mt-1 bg-gray-200 text-gray-600 h-10 rounded w-52 text-xs flex items-center">
            <input
              placeholder="账簿名称"
              className="text-center bg-transparent w-full"
              onInput={debounce((e) => {
                const value = (e.target as HTMLInputElement).value;
                setName(value);
              }, 300)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="mt-12 w-16 h-16 rounded-full flex justify-center items-center"
            fill
          >
            <Icons name="save" className="save-icon" />
          </Button>
        </div>
      </div>

      {/* <div className="grid grid-cols-3 mt-5 px-2">
        <Book name="据了解考虑佳节快乐尽快了解了解" />
        <Book name="据了" />
        <Book name="jlkjljkjlkjlkjljljkjljkj" />
      </div> */}
    </Page>
  );
};

export default AccountBook;
