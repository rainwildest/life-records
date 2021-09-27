import HomePage from "views/homePage";
import Statistics from "views/statistics";
import Mine from "views/mine";

const normalRoutes = [
  {
    path: "/home",
    component: HomePage
  },
  {
    path: "/statistics",
    component: Statistics
  },
  {
    path: "/mine",
    component: Mine
  }
];
export default normalRoutes;
