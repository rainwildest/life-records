import React, { useRef, useState } from "react";
import { Page, PageContent, Navbar, NavRight, Button } from "framework7-react";
import { Formik, Form, FormikProps } from "formik";
import { Icons, InputField } from "components";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { useCreateBudgetMutation, useModifyBudgetMutation } from "graphql/model/budget.graphql";
import { RouterProps } from "typings/f7-route";
import event from "lib/apis/framework-event";

const Modify: React.FC<RouterProps> = ({ f7route, f7router }) => {
  const { id } = f7route.query;
  const formik = useRef<FormikProps<any>>();
  const [saving, setSaving] = useState(false);

  const fields = {
    amounts: "",
    expenseId: ""
  };

  const { loading, data } = useLivingExpensesQuery();

  const [createBudgetMutation] = useCreateBudgetMutation();
  const [mdifyBudgetMutation] = useModifyBudgetMutation();

  const payDetails = data?.livingExpenses;

  const onSaveBefore = () => {
    formik.current.submitForm();
  };

  const onSelectType = (e: any) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("data-id");

    formik.current.setFieldValue("expenseId", name);
  };

  const onSubmit = (values: any) => {
    setSaving(true);
    onSave(values);
  };

  const onSave = (data) => {
    const operation = id ? mdifyBudgetMutation : createBudgetMutation;
    const _param: any = id ? { id, input: data } : { input: data };
    const variables = { ..._param };

    operation({ variables })
      .then(() => {
        event.emit("update-budget");

        f7router.back();
      })
      .catch(() => {
        setSaving(false);
      });
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
          <Formik innerRef={formik} initialValues={fields} onSubmit={onSubmit}>
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
                          <Icons name={item.expenseIcon} className="svg-icon-30" />
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
