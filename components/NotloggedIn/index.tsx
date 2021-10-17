import React, { useEffect, useState } from "react";
import { Link } from "framework7-react";
import { mergeClassName } from "lib/api/utils";

type NotloggedInOptions = {
  className?: string;
};
const NotloggedIn: React.FC<NotloggedInOptions> = ({ className = "" }) => {
  const defaultClassName =
    "w-full h-full absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center z-50";
  // const random = parseInt((Math.random() * 5).toString());
  const [random] = useState(parseInt((Math.random() * 5).toString()));

  const imageUrls = [1, 2, 3, 4, 5].map(
    (num) => `/images/menhera-0${num}.webp`
  );

  return (
    <section className={mergeClassName(className, defaultClassName)}>
      <img className="w-80 h-80 object-contain" src={imageUrls[random]} />
      <section className="text-sm text-gray-700">
        还没登录呢，
        <Link href="/login" className="text-blue-600">
          去登录吧(..›ᴗ‹..)
        </Link>
      </section>
    </section>
  );
};

export default NotloggedIn;