import React, { useState, useEffect, memo, useRef } from "react";
import { Page, PageContent, Navbar, NavRight, useStore, Sheet, Button } from "framework7-react";
import { useCreateFundPlanMutation, useModifyFundPlanMutation } from "graphql/model/fund-plan.graphql";
import { useLivingExpensesQuery } from "graphql/model/living-expenses.graphql";
import { toastTip } from "lib/apis/utils";
import { format, toISOString } from "lib/apis/dayjs";
import event from "lib/apis/framework-event";
import { RouterProps } from "typings/f7-route";
import { Icons, InputField, SheetDatePicker } from "components";
import { Formik, Form, FormikProps } from "formik";
import usePlanData from "./utils/usePlanData";
import _ from "lodash";
import * as Yup from "yup";

const Modify: React.FC<RouterProps> = ({ f7router, f7route }) => {
  const { id } = f7route.query;
  const token = useStore("token");
  const formik = useRef<FormikProps<any>>();
  const expenseId = useRef<string>();
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [sheetDateOpened, setSheetDateOpened] = useState(false);

  const fields = { name: "", amounts: "", expenseId: "", approximateAt: "" };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("请输入计划名称"),
    amounts: Yup.number().required("请输入金额"),
    expenseId: Yup.string().required("请选择计划类型"),
    approximateAt: Yup.date().required("请输入大概完成时间")
  });

  const { data: detailData } = usePlanData(id);
  const [createFundPlan] = useCreateFundPlanMutation();
  const [modifyFundPlan] = useModifyFundPlanMutation();

  const { loading, data } = useLivingExpensesQuery();

  const payDetails = data?.livingExpenses;

  const onSaveBefore = () => {
    formik.current.submitForm().then(() => {
      const errors = formik.current.errors;
      const keys = _.keys(errors);

      if (!keys.length) return setSaving(true);

      toastTip(errors[keys[0]] as string);
    });
  };

  const onSave = (data: any) => {
    const $operation = id ? modifyFundPlan : createFundPlan;

    const $param: any = id ? { id, input: data } : { input: data };
    const variables = { ...$param };

    $operation({ variables })
      .then(() => {
        // 提送消息更新内容
        event.emit("update-plan");

        f7router.back();
      })
      .catch(() => {
        toastTip("保存失败");
        setSaving(false);
      });
  };

  useEffect(() => {
    const detail = detailData?.fundPlanById;
    if (detail && payDetails?.length) {
      _.keys(fields).forEach((key) => {
        switch (key) {
          case "expenseId":
            {
              expenseId.current = detail[key];
              const pay = payDetails.find((item) => item.id === detail[key]);
              formik.current.setFieldValue(key, pay.expenseName);
            }
            break;
          case "approximateAt":
            {
              setDate(detail[key]);
              formik.current.setFieldValue(key, format(detail[key], "YYYY-MM"));
            }
            break;
          default:
            formik.current.setFieldValue(key, detail[key]);
            break;
        }
      });
    }
  }, [detailData, payDetails]);

  const onSelectType = (e: any) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("data-name");

    formik.current.setFieldValue("expenseId", name);
    expenseId.current = target.getAttribute("data-id");

    setPopupOpened(false);
  };

  const onPopupToggle = () => setPopupOpened(true);

  const onCloseSheet = () => {
    setPopupOpened(false);
  };

  const onSubmit = (values: any) => {
    setSaving(true);
    onSave({ ...values, expenseId: expenseId.current, approximateAt: date });
  };

  const onToggledDateSheet = () => {
    setSheetDateOpened(!sheetDateOpened);
  };

  const onConfirmDateSheet = (e: string) => {
    const _d = e.split("-").map((item) => parseInt(item));
    const dateObj = new Date(_d[0], _d[1], 0);
    const days = dateObj.getDate();

    const $date = `${e}-${days} 23:59:59`;
    formik.current.setFieldValue("approximateAt", format($date, "YYYY-MM"));
    setDate(toISOString($date));
  };

  return (
    <Page noToolbar pageContent={true}>
      <Navbar className="h-12" backLink noHairline title={id ? "编辑计划" : "添加计划"}>
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

      <div className="px-7 mt-10">
        <Formik innerRef={formik} initialValues={fields} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <InputField
                label="计划类型"
                placeholder="请输入计划类型"
                autoComplete="off"
                value={values.expenseId}
                name="expenseId"
                readOnly={true}
                setFieldValue={setFieldValue}
                onClick={onPopupToggle}
              />

              <InputField
                label="计划名称"
                placeholder="请输入计划名称"
                autoComplete="off"
                value={values.name}
                name="name"
                setFieldValue={setFieldValue}
              />

              <InputField
                label="金额"
                placeholder="请输入金额"
                autoComplete="off"
                value={values.amounts}
                name="amounts"
                type="number"
                setFieldValue={setFieldValue}
              />

              <InputField
                label="大概完成时间"
                placeholder="请输入大概完成时间"
                autoComplete="off"
                value={values.approximateAt}
                name="approximateAt"
                readOnly={true}
                setFieldValue={setFieldValue}
                onClick={onToggledDateSheet}
              />
            </Form>
          )}
        </Formik>
      </div>

      <SheetDatePicker
        date={date ? format(date, "YYYY-MM") : ""}
        sheetOpened={sheetDateOpened}
        onSheetClosed={onToggledDateSheet}
        onConfirm={onConfirmDateSheet}
      />

      <Sheet
        className="h-2/3 rounded-t-xl overflow-hidden"
        opened={popupOpened}
        onSheetClosed={onCloseSheet}
        swipeToClose
        backdrop
      >
        <Page pageContent={false}>
          <Navbar className="h-14" noHairline title="计划类型">
            <NavRight>
              <div className="px-3 flex items-center link" onClick={onCloseSheet}>
                <i className="f7-icons">multiply_circle</i>
              </div>
            </NavRight>
          </Navbar>
          <PageContent className="pt-16 pb-10">
            <div className="pt-5 grid grid-cols-4 gap-4 px-5">
              {payDetails?.map((item) => {
                return (
                  <div
                    className="shadow-3 shadow-active-3 rounded-lg py-2 px-4"
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
          </PageContent>
        </Page>
      </Sheet>
    </Page>
  );
};

export default memo(Modify);
