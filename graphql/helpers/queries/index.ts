import { userid, expense, bookid } from "./common";
import { user, statistics } from "./users";
import { costDetails } from "./cost-details";
import { livingExpenses, livingExpensesById } from "./living-expenses";
import {
  statisticalDetails,
  details as statisticalData,
  statisticalGeneralization,
  statisticalExpenditureOrIncome,
  statisticalBooks,
  statisticalFundPlan
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
  statisticalDetails,
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
    details: statisticalData
  },
  FundPlan: {
    user: userid,
    expense
  },
  AccountBooks: {
    user: userid
  }
};
