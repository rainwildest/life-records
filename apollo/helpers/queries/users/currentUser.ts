import { AuthenticationError } from "apollo-server-micro";

export default (_parent, _args, context: unknown) => {
  // const { currentUser } = context;
  const { user } = context as GraphqlContext;

  return user;
  // try {
  //   if (!currentUser) {
  //     throw new AuthenticationError(
  //       "Authentication token is invalid, please log in"
  //     );
  //   }

  //   return currentUser;
  // } catch (error) {
  //   throw new AuthenticationError(
  //     "Authentication token is invalid, please log in"
  //   );
  // }
};
