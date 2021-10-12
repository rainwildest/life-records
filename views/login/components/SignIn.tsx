import React, { useState } from "react";
import { Button, Link } from "framework7-react";
import ThirdParty from "./ThirdParty";
import Field from "./Field";
import Icons from "components/Icons";
import request from "lib/api/request";

type SignInOptions = {
  className?: string;
  isSignIn?: boolean;
  btnText?: string;
  onSignUp?: () => void;
};
const SignIn: React.FC<SignInOptions> = ({
  btnText = "",
  isSignIn,
  onSignUp
}) => {
  const [username, setUsername] = useState("rainwildest@163.com");
  const [password, setPassword] = useState("12345678");
  const [submitting, setSubmitting] = useState(false);

  const onSignIn = () => {
    setSubmitting(true);

    const md5 = require("md5");
    setTimeout(() => {
      request({
        url: "/api/auth/signIn",
        method: "POST",
        data: JSON.stringify({
          email: username.trim(),
          password: md5(password.trim())
        })
      })
        .then((val) => {
          console.log(val);
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
        });
    }, 1000 * 0.5);
  };

  return (
    <div
      className={`signin-content mt-10 flex flex-col justify-center items-center z-50${
        isSignIn ? " active" : ""
      }`}
    >
      <section className="signin-container relative mb-5">
        <div className="signin-avatar rounded-full overflow-hidden absolute flex justify-center items-center left-1/2 transform -translate-x-1/2 z-50">
          <Icons name="avatar-05" />
        </div>

        <div className="input-container absolute text-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Field label="邮&nbsp;箱" value={username} clear />
          <Field label="密&nbsp;码" type="password" value={password} clear />

          <div className="text-center mt-6 text-xs">
            <Link className="text-gray-500" href="/tabs/">
              忘记密码？(〃'▽'〃)
            </Link>
          </div>
        </div>

        <div className="outer w-full h-full relative">
          <Button
            className="signin-btn h-10 absolute left-2/4 transform -translate-x-2/4 w-32"
            raised
            fill
            round
            color="black"
            onClick={onSignIn}
          >
            {!submitting && btnText}
            {submitting && <Icons name="spinner" className="animate-spin" />}
          </Button>
        </div>
      </section>

      <Button
        className="signin-btn w-32 mt-6 h-10"
        round
        color="black"
        onClick={onSignUp || null}
      >
        注&ensp;册
      </Button>

      <ThirdParty />
    </div>
  );
};

export default SignIn;
