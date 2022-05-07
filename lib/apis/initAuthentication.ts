import passport from "passport";
import codeComparison from "./code-comparison";
import { getUserByEmail, createOauthOrFindUser, verifyUserByEmail } from "db/sql/users";

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
            const user = await getUserByEmail(email);

            /* 用户存在则报错 */
            if (user) {
              const error = codeComparison["4001"];
              const info = { code: 4001, data: null, msg: error };

              return cb(info, null);
            }
          } catch (err) {
            return cb({ code: 4000, data: null, mgs: err }, null);
          }

          /* 确认没有该用户 */
          return cb(null, null);
        }

        /* 登录检测该邮箱是否存在 */
        return verifyUserByEmail({
          email,
          password
        })
          .then((user) => {
            cb(null, user);
            return user;
          })
          .catch((err) => {
            const info = { code: 4000, data: null, msg: err };
            return cb(info, null);
          });
      }
    )
  );
};

export const gitHubInitAuthentication = (): void => {
  const GitHubStrategy = require("passport-github2").Strategy;

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      },
      function (accessToken, refreshToken, profile, done) {
        const { id, username, photos } = profile;

        const user = {
          github_provider_id: id,
          username,
          profile_photo: (!!photos && photos[0]?.value) || null
        };

        return createOauthOrFindUser(user, "github_provider_id")
          .then((user) => {
            done(null, user);
            return user;
          })
          .catch((err) => {
            const info = { code: 4000, data: null, error: err };
            return done(info, null);
          });
      }
    )
  );
};

/* 获取用户提交的信息（用于Google登录） */
export const googleInitAuthentication = (): void => {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      function (accessToken, refreshToken, profile, done) {
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

        return createOauthOrFindUser(user, "google_provider_id")
          .then((user) => {
            done(null, user);
            return user;
          })
          .catch((err) => {
            const info = { code: 4000, data: null, error: err };
            return done(info, null);
          });
      }
    )
  );
};
