import React from "react";

const options = {
  transition: "f7-cover"
};
const asyncRoutes = [
  /* 记账 */
  {
    path: "/bookkeeping",
    asyncComponent: (): React.ReactNode => import("views/bookkeeping"),
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
