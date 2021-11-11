import React, { useRef, useEffect, memo } from "react";
import Icons from "components/Icons";
import { F7Router } from "typings/f7-route";

type BookOptions = {
  id?: string;
  name?: string;
} & F7Router;
const Book: React.FC<BookOptions> = ({ name, id, f7router }) => {
  const parent = useRef<HTMLDivElement>(null);
  const chil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parent.current) return;
    const i = parent.current;
    const o = chil.current;
    if (i.offsetHeight < o.offsetHeight) {
      o.style.transform = `scale(${i.offsetHeight / o.offsetHeight - 0.02})`;
    }
  }, [name]);

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
      <div
        className="ancient-book-name flex justify-center px-4 items-center bg-white absolute text-sm rounded-sm"
        ref={parent}
      >
        <div ref={chil} className="break-all font-bold text-gray-900">
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
