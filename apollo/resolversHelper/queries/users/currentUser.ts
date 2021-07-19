import { AuthenticationError } from "apollo-server-micro";

export default async (_parent, _args, context) => {
  const { currentUser } = context;
  try {
    if (!currentUser) {
      throw new AuthenticationError(
        "Authentication token is invalid, please log in"
      );
    }

    return currentUser;
  } catch (error) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};
