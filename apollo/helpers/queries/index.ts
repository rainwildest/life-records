import { userid } from "./common";
import { currentUser } from "./users";
import { costDetails, expense } from "./cost-details";
import { livingExpenses } from "./living-expenses";
import {
  statisticalDetails,
  details as statisticalData
} from "./statistical-details";

export const queries = {
  currentUser,
  costDetails,
  livingExpenses,
  statisticalDetails
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
