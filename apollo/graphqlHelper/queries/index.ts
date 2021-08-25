import currentUser from "./users/currentUser";
import costDetails from "./cost-details";
import userid from "./common/userid";

export const queries = {
  currentUser,
  costDetails
};
export const custom = {
  CostDetails: {
    user: userid
    // expense: null
  }
  // LivingExpenses: { user: null }
};
