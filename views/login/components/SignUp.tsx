import React, { useState } from "react";
import { Button, Link } from "framework7-react";
import ThirdParty from "./ThirdParty";
import Field from "./Field";
import Icons from "components/Icons";
import request from "lib/api/request";

type SignUpOptions = {
  className?: string;
  isSignUp?: boolean;
  btnText?: string;
  onSignIn?: () => void;
};
const SignUp: React.FC<SignUpOptions> = ({ btnText, isSignUp, onSignIn }) => {
  const [submitting, setSubmitting] = useState(false);

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
          <Field label="用户名" clear />
          <Field label="邮&emsp;箱" clear />
          <Field label="密&emsp;码" type="password" clear />
        </div>

        <div className="outer w-full h-full relative">
          <Button
            className="signup-btn h-10 absolute left-2/4 transform -translate-x-2/4 w-32"
            raised
            fill
            round
            color="black"
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
