import { custom as _queriesCustom, queries } from "./queries";
import { custom as _mutationCustom, mutations } from "./mutations";

export const queriesHelper = { ...queries };
export const queriesCustom = { ..._queriesCustom };

export const mutationsHelper = { ..._mutationCustom };
export const mutationCustom = { ...mutations };
