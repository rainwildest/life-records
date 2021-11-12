import React, { useRef, useEffect, memo } from "react";
import Icons from "components/Icons";
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
      className={`ancient-books-container overflow-hidden relative opacity-80 justify-self-center${
        !id || !f7router ? "" : " link"
      }`}
      onClick={onNavigate}
    >
      <div className="ancient-book-name flex justify-center py-2 items-center bg-white absolute text-sm rounded-sm overflow-hidden">
        <div className="break-all font-bold text-gray-900 truncate tracking-widest">
          {name}
        </div>
      </div>
      <Icons
        name="ancient-books"
        className="ancient-books-container flex justify-center"
      />
    </div>
  );
};

export default memo(Book);
