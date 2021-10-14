import Home from "views/home";
// import Home from "pages/login";
import Statistics from "views/statistics";
import Mine from "views/mine";

const normalRoutes = [
  { path: "/home", component: Home },
  { path: "/statistics", component: Statistics },
  { path: "/mine", component: Mine }
];
export default normalRoutes;
