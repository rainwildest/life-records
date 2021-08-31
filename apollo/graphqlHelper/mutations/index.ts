import {
  createCostDetail,
  modifyCostDetail,
  removeCostDetail
} from "./cost-details";
import {
  createLivingExpenses,
  modifyLivingExpenses,
  removeLivingExpenses
} from "./living-expenses";

export const mutations = {
  createLivingExpenses,
  modifyLivingExpenses,
  removeLivingExpenses,
  createCostDetail,
  modifyCostDetail,
  removeCostDetail
};
