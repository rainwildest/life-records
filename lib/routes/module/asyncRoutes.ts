import React from "react";
import store from "lib/store";

const options = {
  // transition: "f7-cover"
};

type RedirectOptions = {
  redirect?: any;
  login?: any;
};
const onRedirect = (resolve, options: RedirectOptions) => {
  const {
    redirect: { url, query: redirectQuery },
    login: { query: loginQuery }
  } = options;

  const token = store.getters.token;
  const route = token.value
    ? `${url}${redirectQuery ? `?${redirectQuery}` : ""}`
    : `/login${loginQuery ? `?${loginQuery}` : ""}`;
  resolve(route);
};

const asyncRoutes = [
  /* 记账 */
  {
    path: "/book-keeping",
    redirect: function ({ to, resolve }): void {
      onRedirect(resolve, {
        redirect: { url: "/route-book-keeping" },
        login: { query: `to=${to.route.path}` }
      });
    },
    // asyncComponent: (): React.ReactNode => import("pages/book-keeping"),
    options
  },
  {
    path: "/route-book-keeping",
    name: "route-book-keeping",
    asyncComponent: (): React.ReactNode => import("pages/book-keeping"),
    options
  },
  /* 账单 */
  {
    path: "/bill",
    name: "bill",
    redirect: function ({ to, resolve }): void {
      onRedirect(resolve, {
        redirect: { url: "/route-bill" },
        login: { query: `to=${to.route.path}` }
      });
    },
    options
  },
  {
    path: "/route-bill",
    name: "route-bill",
    asyncComponent: (): React.ReactNode => import("views/bill"),
    options
  },
  {
    path: "/login",
    name: "login",
    asyncComponent: (): React.ReactNode => import("pages/login"),
    options
  }
];

export default asyncRoutes;
