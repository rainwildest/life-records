import { userid } from "./common";
import { currentUser } from "./users";
import { costDetails, expense } from "./cost-details";
import { livingExpenses } from "./living-expenses";
import {
  statisticalDetails,
  details as statisticalData,
  statisticalGeneralization,
  statisticalExpenditureOrIncome
} from "./statistical";

export const queries = {
  currentUser,
  costDetails,
  livingExpenses,
  statisticalDetails,
  statisticalGeneralization,
  statisticalExpenditureOrIncome
};

export const custom = {
  CostDetails: {
    user: userid,
    expense
  },
  StatisticalDetails: {
    details: statisticalData
  }
};
