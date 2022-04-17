// ! 但凡用到 passport 的地方都要先 initPasport
import passport from "passport";

/* 初始化 passport */
const initPassport = (): void => {
  // 將 user object 變成字串
  passport.serializeUser((user, done) => {
    done(null, typeof user === "string" ? user : JSON.stringify(user));
  });

  // 將字串變返做 obj
  passport.deserializeUser((data, done) => {
    let user = null;

    try {
      user = JSON.parse(data);
    } catch (err) {
      console.error(`error: ${err}`);
    }

    // 檢查有沒有 id 欄位和 created_at 欄位
    if (user && user.id && user.created_at) {
      return done(null, user);
    }

    // 沒有通過檢查就返回 null
    return done(null, null);
  });
};

export default initPassport;
