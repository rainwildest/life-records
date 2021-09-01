import { AuthenticationError } from "apollo-server-micro";

export default (_parent, _args, context) => {
  const { currentUser } = context;
  console.log("jskdlfj");
  return { id: "test", username: "test", created_at: new Date("2020-08-12") };
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
