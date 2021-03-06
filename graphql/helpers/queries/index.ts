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
  statisticalExpenditureOrIncome,
  statisticalBudgetByYear
} from "./statistical";
import { fundPlan, fundPlanById } from "./fund-plan";
import { accountBooks } from "./account-books";
import { budgets, budgetById } from "./budgets";

export const queries = {
  user,
  budgets,
  budgetById,
  fundPlan,
  costDetails,
  fundPlanById,
  accountBooks,
  livingExpenses,
  livingExpensesById,
  statisticalBooks,
  statisticalCostDetails,
  statisticalGeneralization,
  statisticalBudgetByYear,
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
