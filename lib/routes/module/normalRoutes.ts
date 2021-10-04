import Home from "views/home";
import Statistics from "views/statistics";
import Mine from "views/mine";

const normalRoutes = [
  {
    path: "/",
    asyncComponent: (): React.ReactNode => import("pages/index"),
    tabs: [
      {
        path: "/",
        id: "tab-home",
        component: Home
      },
      {
        path: "/statistics",
        id: "tab-statistics",
        component: Statistics
      },
      {
        path: "/mine",
        id: "tab-mine",
        component: Mine
      }
    ]
  }
];
export default normalRoutes;
