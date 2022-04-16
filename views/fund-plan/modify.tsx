import React, { useState, useEffect, memo, useRef } from "react";
import { Page, PageContent, Navbar, NavRight, useStore, Sheet, Button } from "framework7-react";
import { useCreateFundPlanMutation, useModifyFundPlanMutation } from "apollo/graphql/model/fund-plan.graphql";
import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import { toastTip } from "lib/api/utils";
import { format, toISOString } from "lib/api/dayjs";
import event from "lib/api/framework-event";
import { RouterOpotions } from "typings/f7-route";
import { Icons, InputField, DatePicker } from "components";
import { Formik, Form, FormikProps } from "formik";
import usePlanData from "./utils/usePlanData";
import _ from "lodash";

const Modify: React.FC<RouterOpotions> = ({ f7router, f7route }) => {
  const { id } = f7route.query;

  const formik = useRef<FormikProps<any>>();
  const date = useRef<string>();
  const expenseId = useRef<string>();
  const picker = useRef(null);

  const token = useStore("token");
  const { data: detailData } = usePlanData(id);

  const [saving, setSaving] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);

  const fields = {
    name: "",
    amounts: "",
    expenseId: "",
    approximateAt: ""
  };

  const [createFundPlan] = useCreateFundPlanMutation();
  const [modifyFundPlan] = useModifyFundPlanMutation();
  const { loading, data } = useLivingExpensesQuery();

  const payDetails = data?.livingExpenses;

  const onSaveBefore = () => {
    formik.current.submitForm();
  };

  const onSave = (data: any) => {
    const _operation = id ? modifyFundPlan : createFundPlan;

    const _param: any = id ? { id, input: data } : { input: data };
    const variables = { ..._param };

    _operation({ variables })
      .then(() => {
        // 提送消息更新内容
        event.emit("update-plan");

        f7router.back();
      })
      .catch((e) => {
        console.log(e);
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
              date.current = detail[key];
              formik.current.setFieldValue(key, format(detail[key], "YYYY-MM"));
            }
            break;
          default:
            formik.current.setFieldValue(key, detail[key]);
            break;
        }
      });
    }

    const _picker = DatePicker({ hasFullYear: false, value: detail ? format(detail.approximateAt, "YYYY-MM") : "" }, (e) => {
      const _d = e.split("-").map((item) => parseInt(item));
      const dateObj = new Date(_d[0], _d[1], 0);
      const days = dateObj.getDate();

      const $date = `${e}-${days} 23:59:59`;

      formik.current.setFieldValue("approximateAt", $date ? format($date, "YYYY-MM") : "");
      date.current = toISOString($date);
    });

    picker.current = _picker;
  }, [detailData, payDetails]);

  const onPickerToggle = () => {
    picker.current.open();
  };
  const openPicker = token && onPickerToggle;

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

  return (
    <Page noToolbar pageContent={true}>
      <Navbar backLink noHairline title={id ? "编辑计划" : "添加计划"}>
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
        <Formik
          innerRef={formik}
          initialValues={{
            name: "",
            amounts: "",
            expenseId: "",
            approximateAt: ""
          }}
          onSubmit={(values) => {
            // same shape as initial values
            setSaving(true);
            const data = { ...values, expenseId: expenseId.current, approximateAt: date.current };
            onSave(data);
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
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
                onClick={openPicker}
              />
            </Form>
          )}
        </Formik>
      </div>

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
                      <Icons name="moon" className="svg-icon-30" />
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
