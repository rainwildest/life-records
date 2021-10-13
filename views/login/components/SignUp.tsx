import React, { useState } from "react";
import { Button, f7 } from "framework7-react";
import ThirdParty from "./ThirdParty";
import Field from "./Field";
import Icons from "components/Icons";
import request from "lib/api/request";

const Toast = (text = "") => {
  f7.toast
    .create({
      text,
      position: "center",
      closeTimeout: 2000
    })
    .open();
};

type SignUpOptions = {
  className?: string;
  isSignUp?: boolean;
  btnText?: string;
  onSignIn?: () => void;
  onSuccess?: (value: any) => void;
};
const SignUp: React.FC<SignUpOptions> = ({
  btnText,
  isSignUp,
  onSignIn,
  onSuccess
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("rainwildest@163.com");
  const [password, setPassword] = useState("12345678");
  const [username, setUsername] = useState("test");

  const onSignUp = () => {
    setSubmitting(true);
    const md5 = require("md5");

    setTimeout(() => {
      request({
        url: "/api/auth/signUp",
        method: "POST",
        data: JSON.stringify({
          email: email.trim(),
          password: md5(password.trim()),
          username: username.trim()
        })
      })
        .then((val) => {
          setSubmitting(false);
          const { code, error, data } = val;
          if (code === 4001) return Toast("该账号已存在");
          if (code !== 2000) return Toast("1001: 注册失败");

          onSuccess && onSuccess(data.token);
        })
        .catch((error) => {
          setSubmitting(false);
          Toast("1002: 注册失败");
        });
    }, 1000 * 0.5);
  };

  const onEmailInput = (value: string) => {
    setEmail(value);
  };
  const onPassword = (value: string) => {
    setPassword(value);
  };
  const onUsername = (value: string) => {
    setUsername(value);
  };

  return (
    <div
      className={`signup-content mt-10 flex flex-col justify-center items-center mt-10 z-50${
        isSignUp ? " active" : ""
      }`}
    >
      <section className="signup-container relative mb-5">
        <div className="signup-avatar rounded-full overflow-hidden absolute flex justify-center items-center left-1/2 transform -translate-x-1/2 z-50">
          <Icons name="avatar-05" />
        </div>

        <div className="input-container absolute text-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Field clear value={username} label="用户名" onInput={onUsername} />
          <Field
            clear
            value={email}
            label="邮&emsp;箱"
            onInput={onEmailInput}
          />
          <Field
            clear
            value={password}
            label="密&emsp;码"
            onInput={onPassword}
            type="password"
          />
        </div>

        <div className="outer w-full h-full relative">
          <Button
            className="signup-btn h-10 absolute left-2/4 transform -translate-x-2/4 w-32"
            raised
            fill
            round
            color="black"
            onClick={onSignUp || null}
          >
            {!submitting && btnText}
            {submitting && <Icons name="spinner" className="animate-spin" />}
          </Button>
        </div>
      </section>

      <Button
        className="signup-btn w-32 mt-6 h-10"
        round
        color="black"
        onClick={onSignIn || null}
      >
        登&ensp;录
      </Button>

      <ThirdParty />
    </div>
  );
};

export default SignUp;
