// import Home from "views/home";
import Home from "pages/login";
import Statistics from "views/statistics";
import Mine from "views/mine";

const normalRoutes = [
  { path: "/home", component: Home },
  { path: "/statistics", component: Statistics },
  { path: "/mine", component: Mine }
  // {
  //   path: "/",
  //   asyncComponent: (): React.ReactNode => import("pages"),
  //   tabs: [
  //     {
  //       path: "/",
  //       id: "tab-home",
  //       component: Home
  //     },
  //     {
  //       path: "/statistics",
  //       id: "tab-statistics",
  //       component: Statistics
  //     },
  //     {
  //       path: "/mine",
  //       id: "tab-mine",
  //       component: Mine
  //     }
  //   ]
  // }
];
export default normalRoutes;
