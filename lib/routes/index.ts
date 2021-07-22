// import { Framework7 } from 'framework7/lite-bundle';
import asyncRoutes from "./module/asyncRoutes";
import normalRoutes from "./module/normalRoutes";
export default [...asyncRoutes, ...normalRoutes] as any;
