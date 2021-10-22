import { routesHandle, RoutesHandleOptions } from "../tools";

const options = {
  // transition: "f7-cover"
};

const testAsyncRoutes: RoutesHandleOptions[] = [
  {
    async: true,
    url: "login",
    component: (): React.ReactNode => import("pages/login")
  },
  {
    async: true,
    url: "about",
    component: (): React.ReactNode => import("views/about")
  },
  {
    async: true,
    redirect: true,
    url: "book-keeping",
    component: (): React.ReactNode => import("pages/book-keeping")
  },
  {
    async: true,
    redirect: true,
    url: "bill",
    component: (): React.ReactNode => import("views/bill")
  },
  {
    async: true,
    redirect: true,
    url: "setting",
    component: (): React.ReactNode => import("views/setting")
  },
  {
    async: true,
    redirect: true,
    url: "bind-account",
    component: (): React.ReactNode => import("views/bind-account")
  },
  {
    async: true,
    redirect: true,
    url: "account-book",
    component: (): React.ReactNode => import("views/account-book")
  },
  {
    async: true,
    redirect: true,
    url: "budget",
    component: (): React.ReactNode => import("views/budget")
  },
  {
    async: true,
    redirect: true,
    url: "fund-plan",
    component: (): React.ReactNode => import("views/fund-plan")
  },
  {
    async: true,
    redirect: true,
    url: "classification",
    component: (): React.ReactNode => import("views/classification")
  }
];

export default routesHandle(testAsyncRoutes, options);
