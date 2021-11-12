import React, { useState } from "react";
import { Page, Navbar, NavRight, Button } from "framework7-react";
import Book from "./components/Book";
import Icons from "components/Icons";
import event from "lib/api/framework-event";
import {
  useCreateAccountBooksMutation,
  useModifyAccountBooksMutation
} from "apollo/graphql/model/account-books.graphql";
import { RouterOpotions } from "typings/f7-route";
import { toastTip } from "lib/api/utils";
/**
 *
 * @param param0
 * @returns
 */
const AccountBook: React.FC<RouterOpotions> = ({ f7router, f7route }) => {
  const { id, name } = f7route.query;
  const [bookName, setBookName] = useState(name);
  const [saving, setSaving] = useState(false);
  const [createAccountBooks] = useCreateAccountBooksMutation();
  const [modifyAccountBooks] = useModifyAccountBooksMutation();

  const onSaveBefore = () => {
    if (!bookName) return toastTip("请填写账簿名称");

    setSaving(true);
    setTimeout(() => {
      onSave();
    }, 1000 * 0.2);
  };

  const onSave = () => {
    const _operation = id ? modifyAccountBooks : createAccountBooks;
    const _param: any = id ? { id } : {};
    const variables = { name: bookName, ..._param };

    _operation({ variables })
      .then(() => {
        // 提送消息更新内容
        if (!id) event.emit("update-books");
        if (id) event.emit("update-name", bookName);

        f7router.back();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onInput = (e) => {
    const value = (e.target as HTMLInputElement).value;
    setBookName(value);
  };
  const onClear = () => {
    setBookName("");
  };

  return (
    <Page noToolbar>
      <Navbar backLink noHairline title={id ? "编辑账簿" : "新增账簿"}>
        <NavRight>
          <Button className="w-20" large small fill onClick={onSaveBefore}>
            <Icons
              name={!saving ? "save" : "spinner"}
              className={`mr-1 save-icon${!saving ? "" : " animate-spin"}`}
            />
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
            value={bookName}
            onInput={onInput}
          />

          {bookName && (
            <Icons
              name="close"
              className="field-clear px-2"
              onClick={onClear}
            />
          )}
        </div>

        <div className="flex justify-center mt-16">
          <Book name={bookName} />
        </div>
      </div>
    </Page>
  );
};

export default AccountBook;
