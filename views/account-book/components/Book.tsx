import React, { useRef, useEffect } from "react";
import Icons from "components/Icons";

type BookOptions = {
  name?: string;
};
const Book: React.FC<BookOptions> = ({ name }) => {
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

  return (
    <div className="ancient-books-container overflow-hidden relative opacity-80 justify-self-center">
      <div
        className="ancient-book-name flex justify-center px-4 items-center bg-white absolute text-sm rounded-sm"
        ref={parent}
      >
        <div ref={chil} className="break-all font-bold">
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

export default Book;
