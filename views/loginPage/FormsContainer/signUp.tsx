import React from "react";
import { FaUser, FaLock, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import md5 from "md5";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import SocialMedis from "./socialMedis";

interface FormInitialValues {
  username: string;
  email: string;
  password: string;
  error_info: string;
}

const initialValues: FormInitialValues = {
  username: "",
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

const SignUp: React.FC = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormInitialValues, { setSubmitting, setFieldError }: FormikHelpers<FormInitialValues>) => {
        fetch("/api/auth/signUp", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username?.trim(),
            password: md5(values.password?.trim()),
            email: values.email?.trim()
          })
        })
          .then(async (states) => {
            const { state, error } = await states?.json();

            if (state) {
              router.replace("/personal-info");
            } else {
              let errorInfo = "";

              switch (error.code) {
                case 4001:
                  errorInfo = "该账户已存在";
                  break;
                default:
                  errorInfo = "注册失败";
                  break;
              }

              setFieldError("error_info", errorInfo);
              setSubmitting(false);
            }
          })
          .catch((err) => {
            console.log("> error:", err);
            setFieldError("error_info", "注册失败");
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, values, setSubmitting }) => (
        <Form className="sign-up-form">
          <h2 className="title">注&emsp;册</h2>
          <Field name="username">
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-field">
                <FaUser />
                <input {...field} autoComplete="off" type="text" placeholder="Username" />
              </div>
            )}
          </Field>

          <Field name="email" validate={validateEmail}>
            {({ field, form: { touched, errors }, meta }) => (
              <div className="input-field">
                <FaEnvelope />
                <input {...field} autoComplete="off" type="text" placeholder="Email" />
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
          <button type="submit" disabled={!!isSubmitting} className={`btn solid ${isSubmitting ? "disabled" : ""}`}>
            {!isSubmitting && "Sign up"}
            {!!isSubmitting && <ImSpinner2 />}
          </button>

          <SocialMedis />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
