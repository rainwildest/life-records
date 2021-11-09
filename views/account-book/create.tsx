import React, { useState } from "react";
import { Page, Navbar, NavRight, Button, useStore, f7 } from "framework7-react";
import Book from "./components/Book";
import Icons from "components/Icons";
import event from "lib/api/framework-event";
import {
  useCreateAccountBooksMutation,
  useModifyAccountBooksMutation
} from "apollo/graphql/model/account-books.graphql";
import { RouterOpotions } from "typings/f7-route";
import { toastTip } from "lib/api/utils";

const AccountBook: React.FC<RouterOpotions> = ({ f7router }) => {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [createAccountBooks] = useCreateAccountBooksMutation();
  // const [modifyAccountBooks] = useModifyAccountBooksMutation();

  const onSaveBefore = () => {
    if (!name) return toastTip("请填写账簿名称");

    setSaving(true);
    setTimeout(() => {
      onSave();
    }, 1000 * 0.2);
  };

  const onSave = () => {
    createAccountBooks({
      variables: { name }
    })
      .then(() => {
        // 提送消息更新内容
        event.emit("update-books");
        f7router.back();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onInput = (e) => {
    const value = (e.target as HTMLInputElement).value;
    setName(value);
  };
  const onClear = () => {
    setName("");
  };

  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="新增账本">
        <NavRight>
          <Button className="w-20" large small fill onClick={onSaveBefore}>
            {!saving && <Icons name="save" className="save-icon mr-1" />}
            {saving && (
              <Icons name="spinner" className="save-icon mr-1 animate-spin" />
            )}
            保存
          </Button>
        </NavRight>
      </Navbar>

      <div className="px-8 mt-10">
        <div className="text-gray-700 font-bold text-sm mb-3 pl-2">
          账簿名称
        </div>
        <div className="relative h-14 w-full px-3 shadow-3 rounded-lg text-gray-600 text-xs flex items-center">
          <input
            placeholder="请输入账簿名称"
            className="bg-transparent text-sm w-full"
            value={name}
            onInput={onInput}
          />

          {name && (
            <Icons
              name="close"
              className="field-clear px-2"
              onClick={onClear}
            />
          )}
        </div>

        <div className="flex justify-center mt-16">
          <Book name={name} />
        </div>
      </div>

      {/* <div className="flex justify-center">
          <Button
            className="mt-20 w-16 h-16 rounded-full flex justify-center items-center"
            fill
          >
            <Icons name="save" className="save-icon" />
          </Button>
        </div> */}

      {/* <div className="grid grid-cols-3 mt-5 px-2">
        <Book name="据了解考虑佳节快乐尽快了解了解" />
        <Book name="据了" />
        <Book name="jlkjljkjlkjlkjljljkjljkj" />
      </div> */}
    </Page>
  );
};

export default AccountBook;
