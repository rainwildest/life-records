import { userid, expense, bookid } from "./common";
import { user, statistics } from "./users";
import { costDetails } from "./cost-details";
import { livingExpenses, livingExpensesById } from "./living-expenses";
import {
  statisticalBooks,
  statisticalBudget,
  statisticalFundPlan,
  statisticalCostTotal,
  statisticalCostDetails,
  statisticalGeneralization,
  details as statisticalData,
  statisticalExpenditureOrIncome
} from "./statistical";
import { fundPlan, fundPlanById } from "./fund-plan";
import { accountBooks } from "./account-books";
import { budgets } from "./budgets";

export const queries = {
  user,
  budgets,
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
  statisticalFundPlan,
  statisticalBudget
};

export const custom = {
  User: {
    statistics
  },
  Budget: {
    expense
    // total: budgetsTotal
  },
  CostDetails: {
    user: userid,
    expense,
    book: bookid
  },
  StatisticalDetails: {
    details: statisticalData,
    total: statisticalCostTotal,
    totalDetails: statisticalCostTotal
  },
  FundPlan: {
    user: userid,
    expense
  },
  AccountBooks: {
    user: userid
  }
};
