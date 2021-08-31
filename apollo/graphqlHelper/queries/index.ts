import currentUser from "./users/currentUser";
import costDetails from "./cost-details";
import userid from "./common/userid";
import expense from "./cost-details/expense";

export const queries = {
  currentUser,
  costDetails
};
export const custom = {
  CostDetails: {
    user: userid,
    expense
  }
};
