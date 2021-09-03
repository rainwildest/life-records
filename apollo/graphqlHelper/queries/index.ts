import currentUser from "./users/currentUser";
import userid from "./common/userid";
import costDetails from "./cost-details";
import expense from "./cost-details/expense";

import livingExpenses from "./living-expenses";
import sameDay from "./sameDay";
import sameDayData from "./sameDay/data";

export const queries = {
  currentUser,
  costDetails,
  livingExpenses,
  sameDay
};

export const custom = {
  CostDetails: {
    user: userid,
    expense
  },
  SameDay: {
    data: sameDayData
  }
};
