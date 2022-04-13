import React, { useRef, useState, useEffect } from "react";
import { RouterOpotions } from "typings/f7-route";
import { Page, Navbar, NavTitle, Segmented, Button, NavRight } from "framework7-react";
import { useCreateLivingExpensesMutation, useModifyLivingExpensesMutation } from "apollo/graphql/model/living-expenses.graphql";
import { Formik, Form, FormikProps } from "formik";
import InputField from "components/InputField";
import Icons from "components/Icons";

const Modify: React.FC<RouterOpotions> = ({ f7route }) => {
  const { type } = f7route.query;

  const formik = useRef();

  const [saving, setSaving] = useState(false);
  console.log(type);

  const [createLivingExpensesMutation] = useCreateLivingExpensesMutation();
  const [modifyLivingExpensesMutation] = useModifyLivingExpensesMutation();

  const onSaveBefore = () => {
    formik.current.submitForm();
  };
  // createLivingExpensesMutation({
  //   variables: {
  //     input: {
  //       expenseType: "",
  //       expenseName: "",
  //       expenseIcon: ""
  //     }
  //   }
  // }).then((val) => {
  //   console.log(val);
  // });

  return (
    <Page noToolbar>
      <Navbar noHairline backLink>
        <NavTitle>添加分类</NavTitle>
        <NavRight>
          <Button className="w-20" large small fill onClick={onSaveBefore}>
            <Icons
              name={!saving ? "save" : "spinner"}
              className={`mr-1 save-icon svg-icon-14 ${!saving ? "" : "animate-spin"}`}
            />
            保存
          </Button>
        </NavRight>
      </Navbar>

      <Formik
        innerRef={formik}
        initialValues={{
          expenseType: type,
          expenseName: "",
          expenseIcon: ""
        }}
        onSubmit={(values) => {
          console.log(values);
          // same shape as initial values
          // setSaving(true);
          // const data = { ...values, expenseId: expenseId.current, approximateAt: date.current };
          // onSave(data);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="px-4 pt-5">
              <InputField
                label="类型名称"
                placeholder="请输入类型名称"
                autoComplete="off"
                value={values.expenseName}
                name="expenseName"
                setFieldValue={setFieldValue}
              />
            </div>

            <div className="px-4 mt-7">
              <div className="text-gray-700 font-bold text-sm">类型图标</div>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default Modify;
