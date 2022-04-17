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
import { createFundPlan, modifyFundPlan, removeFundPlan } from "./fund-plan";
import {
  createAccountBooks,
  modifyAccountBooks,
  removeAccountBooks
} from "./account-books";

export const mutations = {
  createLivingExpenses,
  modifyLivingExpenses,
  removeLivingExpenses,
  createCostDetail,
  modifyCostDetail,
  removeCostDetail,
  createFundPlan,
  modifyFundPlan,
  removeFundPlan,
  createAccountBooks,
  modifyAccountBooks,
  removeAccountBooks
};
