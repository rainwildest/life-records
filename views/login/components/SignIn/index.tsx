import React, { useState, useRef } from "react";
import { Button, Link, f7 } from "framework7-react";
import ThirdParty from "../ThirdParty";
import LoginField from "../Field";
import { Icons, InputField } from "components";
import request from "lib/apis/request";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";

const Toast = (text = "") => {
  f7.toast
    .create({
      text,
      position: "center",
      closeTimeout: 2000
    })
    .open();
};

type SignInOptions = {
  className?: string;
  isSignIn?: boolean;
  btnText?: string;
  onSignUp?: () => void;
  onSuccess?: (value: any) => void;
};

const SignIn: React.FC<SignInOptions> = ({ btnText = "", isSignIn, onSignUp, onSuccess }) => {
  const formik = useRef<FormikProps<any>>();
  const [email, setEmail] = useState("rainwildest@163.com");
  const [password, setPassword] = useState("12345678");
  const [submitting, setSubmitting] = useState(false);

  const fields = {
    email: "rainwildest@163.com",
    password: "12345678"
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(20, "账簿名称至少1到20个字").required("请输入账簿名称")
  });

  const onSignIn = () => {
    setSubmitting(true);

    const md5 = require("md5");
    setTimeout(() => {
      request({
        url: "/api/auth/signIn",
        method: "POST",
        data: JSON.stringify({
          email: email.trim(),
          password: md5(password.trim())
        })
      })
        .then((val) => {
          const { code, data } = val;
          setSubmitting(false);
          if (code !== 2000) return Toast("账号或密码错误");

          onSuccess && onSuccess(data.token);
        })
        .catch((error) => {
          setSubmitting(false);
          Toast("登录失败");
        });
    }, 1000 * 0.5);
  };

  const onEmailInput = (value: string) => {
    setEmail(value);
  };
  const onPassword = (value: string) => {
    setPassword(value);
  };

  const onSubmit = () => {
    console.log("sdfsd");
  };
  return (
    <div className={`signin-content mt-10 flex flex-col justify-center items-center z-50${isSignIn ? " active" : ""}`}>
      <section className="signin-container relative mb-5">
        <div className="signin-avatar rounded-full overflow-hidden absolute flex justify-center items-center left-1/2 transform -translate-x-1/2 z-50">
          <Icons name="avatar-05" className="svg-icon-60" />
        </div>

        <div className="input-container absolute text-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Formik innerRef={formik} initialValues={fields} onSubmit={onSubmit}>
            {/* <Field clear value={email} label="邮&nbsp;箱" onInput={onEmailInput} />
            <Field clear value={password} label="密&nbsp;码" type="password" onInput={onPassword} /> */}
            {({ values, setFieldValue }) => (
              <Form>
                <LoginField
                  placeholder="请输入账簿名称"
                  autoComplete="off"
                  value={values.name}
                  name="name"
                  setFieldValue={setFieldValue}
                />
              </Form>
            )}
          </Formik>
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
            {submitting && <Icons name="spinner" className="animate-spin svg-icon-20" />}
          </Button>
        </div>
      </section>

      <Button className="signin-btn w-32 mt-6 h-10" round color="black" onClick={onSignUp || null}>
        注&ensp;册
      </Button>

      <ThirdParty />
    </div>
  );
};

export default SignIn;
