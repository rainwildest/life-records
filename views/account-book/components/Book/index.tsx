import React, { memo } from "react";
import { Icons } from "components";
import { F7Router } from "typings/f7-route";

type BookOptions = {
  id?: string;
  name?: string;
} & F7Router;

const Book: React.FC<BookOptions> = ({ name, id, f7router }) => {
  const onNavigate = () => {
    if (!id || !f7router) return;

    const url = f7router.generateUrl({
      name: "account-book-details",
      params: { id: "id", name: "name" },
      query: { id, name }
    });

    f7router.navigate(url);
  };

  return (
    <div
      className={`shadow-3 rounded-lg flex py-3 px-2 justify-start items-center ${!id || !f7router ? "" : " shadow-active-3"}`}
      onClick={onNavigate}
    >
      <Icons name="ancient-books" className="scale-80" />
      <div className="overflow-hidden">
        <div className="text-gray-400 text-xs">账簿名称</div>
        <div className="mt-1 break-all text-sm font-semibold text-gray-900 truncate tracking-widest">{name}</div>
      </div>
    </div>
  );
};

export default memo(Book);
