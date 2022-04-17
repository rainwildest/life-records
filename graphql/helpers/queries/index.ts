import { userid, expense, bookid } from "./common";
import { user, statistics } from "./users";
import { costDetails } from "./cost-details";
import { livingExpenses, livingExpensesById } from "./living-expenses";
import {
  statisticalBooks,
  statisticalFundPlan,
  statisticalCostTotal,
  statisticalCostDetails,
  statisticalGeneralization,
  details as statisticalData,
  statisticalExpenditureOrIncome
} from "./statistical";
import { fundPlan, fundPlanById } from "./fund-plan";
import { accountBooks } from "./account-books";

export const queries = {
  user,
  fundPlan,
  costDetails,
  fundPlanById,
  accountBooks,
  livingExpenses,
  livingExpensesById,
  statisticalBooks,
  statisticalCostDetails,
  statisticalGeneralization,
  statisticalExpenditureOrIncome,
  statisticalFundPlan
};

export const custom = {
  User: {
    statistics
  },
  CostDetails: {
    user: userid,
    expense,
    book: bookid
  },
  StatisticalDetails: {
    details: statisticalData,
    total: statisticalCostTotal
  },
  FundPlan: {
    user: userid,
    expense
  },
  AccountBooks: {
    user: userid
  }
};
