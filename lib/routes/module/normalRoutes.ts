import HomePage from "views/homePage";
import Statistics from "views/statistics";
import Mine from "views/mine";
import Generalization from "views/statistics/generalization";

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
  },

  {
    path: "/generalization",
    component: Generalization
  }
];
export default normalRoutes;
