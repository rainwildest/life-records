import passport from "passport";
import codeComparison from "./code-comparison";
import { getUserByEmailQuery, verifyUserQuery } from "db/sql/users";

/* 获取用户提交的信息（用于账号和密码登录） */
export const localInitAuthentication = (isSignUp = false): void => {
  const LocalStrategy = require("passport-local").Strategy;
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, cb) => {
        /* 注册时检测该邮箱是否已存在 */
        if (isSignUp) {
          /* 检测用户是否存在 */
          try {
            const user = await getUserByEmailQuery(email);

            /* 用户存在则报错 */
            if (user) {
              const error = codeComparison["4001"];
              const info = { code: 4001, data: null, error };
              return cb(info, null);
            }
          } catch (err) {
            return cb({ code: 4000, data: null, error: err }, null);
          }

          /* 确认没有该用户 */
          return cb(null, null);
        }

        /* 登录检测该邮箱是否存在 */
        return verifyUserQuery({
          email,
          password
        })
          .then((user) => {
            cb(null, user);
            return user;
          })
          .catch((err) => {
            return cb(null, err, {
              code: 4000,
              data: null,
              error: err
            });
          });
      }
    )
  );
};

export const gitHubInitAuthentication = () => {
  const GitHubStrategy = require("passport-github2").Strategy;

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      },
      function (accessToken, refreshToken, profile, cb) {
        const { id, displayName, username, photos } = profile;

        const user = {
          github_provider_id: id,
          username,
          profile_photo: (!!photos && photos[0]?.value) || null
        };
        console.log(user);

        return { id: "sdfdsf", username: "jsdfkds" };

        // return createOrFindUser(user, 'github_provider_id')
        //   .then(user => {
        //     cb(null, user)
        //     return user
        //   }).catch(err => {
        //     return cb(null, err, {
        //       message: 'Please sign in with other to create a new account.'
        //     })
        //   })
      }
    )
  );
};

/* 获取用户提交的信息（用于Google登录） */
export const googleInitAuthentication = () => {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      function (accessToken, refreshToken, profile, cb) {
        const { id, emails, displayName, photos, name } = profile;

        let username = "";

        if (displayName || name) {
          const givenName = profile.name.givenName;
          const familyName = profile.name.familyName;
          username = `${givenName || ""}${familyName ? ` ${familyName}` : ""}`;
        }

        const user = {
          username,
          google_provider_id: id,
          // email: (!!emails && emails[0].value) || null,
          profile_photo: (!!photos && photos[0]?.value) || null
        };

        // return createOrFindUser(user, 'google_provider_id')
        //   .then(user => {
        //     cb(null, user)
        //     return user
        //   }).catch(err => {
        //     return cb(null, err, {
        //       message: 'Please sign in with other to create a new account.'
        //     })
        //   })
      }
    )
  );
};
