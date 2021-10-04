import React from "react";

const options = {
  transition: "f7-cover"
};
const asyncRoutes = [
  /* 记账 */
  {
    path: "/book-keeping",
    asyncComponent: (): React.ReactNode => import("pages/book-keeping"),
    options
  },
  /* 账单 */
  {
    path: "/bill",
    asyncComponent: (): React.ReactNode => import("views/bill"),
    options
  }
];

export default asyncRoutes;
