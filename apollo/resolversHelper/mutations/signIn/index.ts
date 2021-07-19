import { UserInputError } from "apollo-server-micro";
import { setLoginSession } from "lib/api/auth";
import { findUser, validatePassword } from "lib/user";
import initPassport from "lib/api/initPassport";
import { localInitAuthentication } from "lib/api/initAuthentication";
import runMiddleware from "lib/api/runMiddleware";
import passport from "passport";

initPassport();
localInitAuthentication();

const main = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.end(JSON.stringify({ state: false, error: err.message }));
    }

    /* 如果用户为null 或 没有用户ID 以及创建时间的话则视为没有登录成功 */
    if ((!!user && !user.id && !user.created_at) || !user) {
      return res.end(
        JSON.stringify({
          state: false,
          error: {
            code: 4000
            // message: code['4000']
          }
        })
      );
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.end(JSON.stringify({ state: true }));
    });
  })(req, res, next);
};

export default async (_parent, args, context, _info) => {
  // console.log(context.req);
  const { req, res } = context;
  await runMiddleware(req, res, passport.initialize());
  await runMiddleware(req, res, passport.session());

  await runMiddleware(req, res, main);
  return null;
  const user = await findUser({ email: args.input.email });

  if (user && (await validatePassword(user, args.input.password))) {
    const session = {
      id: user.id,
      email: user.email
    };

    await setLoginSession(context.res, session);

    return { user };
  }

  throw new UserInputError("Invalid email and password combination");
};
