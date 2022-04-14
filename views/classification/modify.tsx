import React, { useRef, useState, useEffect } from "react";
import { RouterOpotions } from "typings/f7-route";
import { Page, Navbar, NavTitle, Segmented, Button, NavRight } from "framework7-react";
import { useCreateLivingExpensesMutation, useModifyLivingExpensesMutation } from "apollo/graphql/model/living-expenses.graphql";
import { Formik, Form, FormikProps } from "formik";
import InputField from "components/InputField";
import Icons from "components/Icons";
import event from "lib/api/framework-event";

const Modify: React.FC<RouterOpotions> = ({ f7route, f7router }) => {
  const { type, id } = f7route.query;

  const formik = useRef<FormikProps<any>>();

  const [saving, setSaving] = useState(false);
  const payIcons = ["calendar", "书籍", "add", "amounts", "avatar-01", "avatar-02", "avatar-03", "avatar-04"];
  const incomeIcons = ["calendar", "书籍", "add", "amounts", "avatar-01", "avatar-02", "avatar-03", "avatar-04"];

  const icons = type === "pay" ? payIcons : incomeIcons;

  const [createLivingExpensesMutation] = useCreateLivingExpensesMutation();
  const [modifyLivingExpensesMutation] = useModifyLivingExpensesMutation();

  const onSaveBefore = () => {
    formik.current.submitForm();
  };

  const onSave = (data) => {
    const _operation = id ? modifyLivingExpensesMutation : createLivingExpensesMutation;
    const _param: any = id ? { id, input: data } : { input: data };
    const variables = { ..._param };

    _operation({ variables })
      .then((val) => {
        event.emit(`update-${type}-classification`);

        f7router.back();
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          onSave(values);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="px-4 pt-5">
              <div>
                <div className="text-gray-700 font-bold text-sm mt-5 mb-3 pl-2">添加类型</div>
                <div className="relative h-14 w-full px-3 shadow-3 rounded-lg text-gray-600 text-xs flex items-center">
                  {type === "pay" ? "支付" : "收入"}
                </div>
              </div>
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
              <div className="grid grid-cols-4 gap-5 pt-3">
                {icons.map((icon, index) => (
                  <div
                    className={`${
                      values.expenseIcon === icon ? "shadow-inset-3" : "shadow-3"
                    } rounded-lg flex justify-center items-center py-4`}
                    onClick={() => {
                      setFieldValue("expenseIcon", icon);
                    }}
                    key={`${icon}-${index}`}
                  >
                    <Icons name={icon} className="svg-icon-28 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default Modify;