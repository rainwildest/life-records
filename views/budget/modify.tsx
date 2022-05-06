import React, { useRef, useState, useEffect } from "react";
import { Page, PageContent, Navbar, NavRight, Button } from "framework7-react";
import { Formik, Form, FormikProps } from "formik";
import { Icons, InputField } from "components";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { useCreateBudgetMutation, useModifyBudgetMutation } from "graphql/model/budget.graphql";
import { RouterProps } from "typings/f7-route";
import event from "lib/apis/framework-event";
import useBudgetDetail from "./utils/useBudgetDetail";
import { toastTip } from "lib/apis/utils";
import _ from "lodash";
import * as Yup from "yup";

const Modify: React.FC<RouterProps> = ({ f7route, f7router }) => {
  const { id } = f7route.query;
  const formik = useRef<FormikProps<any>>();
  const [saving, setSaving] = useState(false);

  const fields = {
    amounts: "",
    expenseId: ""
  };

  const validationSchema = Yup.object().shape({
    amounts: Yup.number().required("请输入预算金额"),
    expenseId: Yup.string().required("请选择预算类型")
  });

  const { data: detail } = useBudgetDetail(id);
  const { loading, data } = useLivingExpensesQuery();

  const [createBudgetMutation] = useCreateBudgetMutation();
  const [modifyBudgetMutation] = useModifyBudgetMutation();

  const payDetails = data?.livingExpenses;

  const onSaveBefore = () => {
    formik.current.submitForm().then(() => {
      const errors = formik.current.errors;
      const keys = _.keys(errors);

      if (!keys.length) return setSaving(true);

      toastTip(errors[keys[0]] as string);
    });
  };

  const onSelectType = (e: any) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("data-id");

    formik.current.setFieldValue("expenseId", name);
  };

  const onSubmit = (values: typeof fields) => {
    const operation = id ? modifyBudgetMutation : createBudgetMutation;
    const _param: any = id ? { id, input: values } : { input: values };
    const variables = { ..._param };

    operation({ variables })
      .then(() => {
        event.emit("update-budget");

        f7router.back();
      })
      .catch((e) => {
        const error = JSON.parse(e.message) as any;

        toastTip(error.msg);
        setSaving(false);
      });
  };

  useEffect(() => {
    const $detail = detail?.budgetById;

    if ($detail) {
      _.keys(fields).forEach((key) => {
        formik.current.setFieldValue(key, $detail[key]);
      });
    }
  }, [detail]);

  return (
    <Page noToolbar pageContent={false}>
      <Navbar className="h-12" noHairline backLink title={`${id ? "编辑" : "新增"}预算`}>
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
          <Formik innerRef={formik} validationSchema={validationSchema} initialValues={fields} onSubmit={onSubmit}>
            {({ values, setFieldValue }) => (
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
