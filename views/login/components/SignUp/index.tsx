import React, { useState, useRef } from "react";
import { Button, f7 } from "framework7-react";
import ThirdParty from "../ThirdParty";
import LoginField from "../LoginField";
import { Icons } from "components";
import request from "lib/apis/request";
import { toastTip } from "lib/apis/utils";
import * as Yup from "yup";
import _ from "lodash";
import { Formik, Form, FormikProps } from "formik";

type SignUpOptions = {
  className?: string;
  isSignUp?: boolean;
  btnText?: string;
  onSignIn?: () => void;
  onSuccess?: (value: any) => void;
};
const isDev = process.env.NODE_ENV === "development";

const SignUp: React.FC<SignUpOptions> = ({ btnText, isSignUp, onSignIn, onSuccess }) => {
  const formik = useRef<FormikProps<any>>();
  const [submitting, setSubmitting] = useState(false);

  const fields = {
    username: isDev ? "test" : "",
    email: isDev ? "rainwildest@163.com" : "",
    password: isDev ? "12345678" : ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("请输入用户名"),
    email: Yup.string().email("请输入有效邮箱").required("请输入邮箱"),
    password: Yup.string().min(6, "密码至少6位").max(32, "密码最多32位").required("请输入密码")
  });

  const onSignUp = () => {
    formik.current.submitForm().then(() => {
      const errors = formik.current.errors;
      const keys = _.keys(errors);

      if (!keys.length) return setSubmitting(true);

      toastTip(errors[keys[0]] as string);
    });
  };

  const onSubmit = (values: typeof fields) => {
    if (submitting) return;

    const { email, password, username } = values;
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
          if (code === 4001) return toastTip("该账号已存在");
          if (code !== 2000) return toastTip("1001: 注册失败");
          onSuccess && onSuccess(data.token);
        })
        .catch((error) => {
          setSubmitting(false);
          toastTip("1002: 注册失败");
        });
    }, 1000 * 0.5);
  };

  return (
    <div className={`signup-content mt-10 flex flex-col justify-center items-center z-50${isSignUp ? " active" : ""}`}>
      <section className="signup-container relative mb-5">
        <div className="signup-avatar rounded-full overflow-hidden absolute flex justify-center items-center left-1/2 transform -translate-x-1/2 z-50">
          <Icons name="avatar-05" className="svg-icon-60" />
        </div>

        <div className="input-container absolute text-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Formik innerRef={formik} initialValues={fields} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => (
              <Form>
                <LoginField
                  name="username"
                  icon="user-01"
                  value={values.username}
                  placeholder="请输入用户名"
                  autoComplete="off"
                  setFieldValue={setFieldValue}
                />
                <LoginField
                  name="email"
                  icon="email"
                  value={values.email}
                  placeholder="请输入邮箱账号"
                  autoComplete="off"
                  setFieldValue={setFieldValue}
                />
                <LoginField
                  name="password"
                  icon="lock-01"
                  type="password"
                  value={values.password}
                  placeholder="请输入密码"
                  autoComplete="off"
                  setFieldValue={setFieldValue}
                />
              </Form>
            )}
          </Formik>
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
            {submitting && <Icons name="spinner" className="animate-spin svg-icon-20" />}
          </Button>
        </div>
      </section>

      <Button className="signup-btn w-32 mt-6 h-10" round color="black" onClick={onSignIn || null}>
        登&ensp;录
      </Button>

      <ThirdParty />
    </div>
  );
};

export default SignUp;
