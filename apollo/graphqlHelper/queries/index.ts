import currentUser from "./users/currentUser";
import userid from "./common/userid";
import costDetails from "./cost-details";
import expense from "./cost-details/expense";

import livingExpenses from "./living-expenses";

export const queries = {
  currentUser,
  costDetails,
  livingExpenses
};

export const custom = {
  CostDetails: {
    user: userid,
    expense
  }
};
