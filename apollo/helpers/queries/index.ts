import { userid, expense } from "./common";
import { user, statistics } from "./users";
import { costDetails } from "./cost-details";
import { livingExpenses } from "./living-expenses";
import {
  statisticalDetails,
  details as statisticalData,
  statisticalGeneralization,
  statisticalExpenditureOrIncome
} from "./statistical";
import { fundPlan } from "./fund-plan";

export const queries = {
  user,
  costDetails,
  livingExpenses,
  statisticalDetails,
  statisticalGeneralization,
  statisticalExpenditureOrIncome,
  fundPlan
};

export const custom = {
  User: {
    statistics
  },
  CostDetails: {
    user: userid,
    expense
  },
  StatisticalDetails: {
    details: statisticalData
  },
  FundPlan: {
    user: userid,
    expense
  }
};
