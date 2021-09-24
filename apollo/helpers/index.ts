import { custom as _queriesCustom, queries } from "./queries";
import { mutations } from "./mutations";

export const queriesHelper = { ...queries };
export const queriesCustom = { ..._queriesCustom };

export const mutationsHelper = { ...mutations };
