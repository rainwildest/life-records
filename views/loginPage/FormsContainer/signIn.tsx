import React from "react";
import { FaUser, FaLock, FaInfoCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import SocialMedis from "./socialMedis";

interface FormInitialValues {
  email: string;
  password: string;
  error_info: string;
}

const initialValues: FormInitialValues = {
  email: "",
  password: "",
  error_info: ""
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "邮箱不可为空";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "无效的邮箱地址";
  }
  return error;
};

const SignIn: React.FC = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: FormInitialValues,
        { setSubmitting, setFieldError }: FormikHelpers<FormInitialValues>
      ) => {
        const md5 = require("md5");
        const fetch = require("node-fetch");
        // 验证用户信息
        fetch("/api/auth/signIn", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email?.trim(),
            password: md5(values.password?.trim())
          })
        })
          .then(async (states) => {
            const { state } = await states?.json();

            if (state) {
              router.replace("/personal-info");
            } else {
              setFieldError("error_info", "帐号或密码错误");
              setSubmitting(false);
            }
          })
          .catch((err) => {
            console.log("> error:", err);
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => (
        <Form className="sign-in-form">
          <h2 className="title">登&emsp;录</h2>

          <Field name="email" validate={validateEmail}>
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-field">
                <FaUser />
                <input
                  {...field}
                  autoComplete="off"
                  type="text"
                  placeholder="Email"
                />
              </div>
            )}
          </Field>

          <Field name="password">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-field">
                <FaLock />
                <input {...field} type="password" placeholder="Password" />
              </div>
            )}
          </Field>

          <div className="error-container">
            <ErrorMessage
              name="email"
              render={(msg) => (
                <div className="error-info">
                  <FaInfoCircle />
                  {msg}
                </div>
              )}
            />
            <ErrorMessage
              name="error_info"
              render={(msg) => (
                <div className="error-info">
                  <FaInfoCircle />
                  {msg}
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            disabled={!!isSubmitting}
            className={`btn solid ${isSubmitting ? "disabled" : ""}`}
          >
            {!isSubmitting && "Sign In"}
            {!!isSubmitting && <ImSpinner2 />}
          </button>

          <SocialMedis />
          {/* <p className='social-text'>或者社交平台登录</p> */}
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
