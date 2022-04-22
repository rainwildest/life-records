import React, { useRef, useState } from "react";
import { Page, PageContent, Navbar, NavRight, Button } from "framework7-react";
import { Formik, Form, FormikProps } from "formik";
import { Icons, InputField } from "components";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { useCreateBudgetMutation } from "graphql/model/budget.graphql";

const Modify: React.FC = () => {
  const formik = useRef<FormikProps<any>>();
  const [saving, setSaving] = useState(false);

  const { loading, data } = useLivingExpensesQuery();

  const [createBudgetMutation] = useCreateBudgetMutation();

  const payDetails = data?.livingExpenses;

  const onSaveBefore = () => {
    formik.current.submitForm();
  };

  const onSelectType = (e: any) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("data-id");

    formik.current.setFieldValue("expenseId", name);
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" noHairline backLink title="新增预算">
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
      <PageContent>
        <div className="px-7 pt-4">
          <Formik
            innerRef={formik}
            initialValues={{
              name: "",
              amounts: "",
              expenseId: "",
              approximateAt: ""
            }}
            onSubmit={(values) => {
              // // same shape as initial values
              // setSaving(true);
              // const data = { ...values, expenseId: expenseId.current, approximateAt: date.current };
              // onSave(data);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <InputField
                  label="预算金额"
                  placeholder="请输入金额"
                  autoComplete="off"
                  value={values.amounts}
                  name="amounts"
                  type="number"
                  setFieldValue={setFieldValue}
                />

                <div className="text-gray-700 font-bold text-sm mt-5 pl-2">预算类型</div>
                <div className="pt-3 grid grid-cols-4 gap-4">
                  {payDetails?.map((item) => {
                    return (
                      <div
                        className={`${values.expenseId === item.id ? "shadow-inset-3" : "shadow-3"} rounded-lg py-2 px-4`}
                        data-name={item.expenseName}
                        data-id={item.id}
                        onClick={onSelectType}
                        key={item.id}
                      >
                        <div className="flex justify-center pointer-events-none">
                          <Icons
                            name={item.expenseIcon || "default-01"}
                            className={`svg-icon-30 ${!item.expenseIcon ? "default-icon-color" : ""}`}
                          />
                        </div>
                        <div className="text-center mt-2 text-xs pointer-events-none">{item.expenseName}</div>
                      </div>
                    );
                  })}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </PageContent>
    </Page>
  );
};

export default Modify;
