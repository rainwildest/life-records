import React from "react";
const asyncRoutes = [
  /* 记账 */
  {
    path: "/bookkeeping",
    asyncComponent: (): React.ReactNode => import("views/bookkeeping"),
    options: {
      transition: "f7-cover"
    }
  }
];

export default asyncRoutes;
