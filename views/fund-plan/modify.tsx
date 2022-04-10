import React, { useState, useEffect, memo, useRef } from "react";
import { Page, Navbar, NavRight, useStore, f7, Link, Button, Popup } from "framework7-react";
import Icons from "components/Icons";
import { toastTip } from "lib/api/utils";
import { RouterOpotions } from "typings/f7-route";
import event from "lib/api/framework-event";
import InputField from "./components/InputField";
import { useCreateFundPlanMutation, useModifyFundPlanMutation } from "apollo/graphql/model/fund-plan.graphql";
import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import DatePicker from "components/DatePicker";
import { format } from "lib/api/dayjs";
import { Formik, Form, Field, FormikProps } from "formik";

const Modify: React.FC<RouterOpotions> = ({ f7router, f7route }) => {
  const { id } = f7route.query;

  const formik = useRef<FormikProps<any>>();
  const date = useRef<string>();

  const token = useStore("token");

  // const [date, setDate] = useState("");
  const [palnName, setPalnName] = useState("");

  const [saving, setSaving] = useState(false);
  const [picker, setPicker] = useState(null);

  const [createFundPlan] = useCreateFundPlanMutation();
  const [modifyFundPlan] = useModifyFundPlanMutation();
  const { loading, data } = useLivingExpensesQuery();

  const payDetails = data?.livingExpenses;
  console.log(payDetails);
  const [popupOpened, setPopupOpened] = useState(false);

  const onSaveBefore = () => {
    console.log(formik.current.submitForm());
    return false;
    if (!palnName) return toastTip("请填写计划名称");

    setSaving(true);
    setTimeout(() => {
      onSave();
    }, 1000 * 0.2);
  };

  const onSave = () => {
    const _operation = id ? modifyFundPlan : createFundPlan;
    const input = {
      name: palnName,
      amounts: 0,
      expenseId: "",
      approximateAt: date.current
    };

    const _param: any = id ? { id, input } : { input };
    const variables = { ..._param };

    _operation({ variables })
      .then(() => {
        // 提送消息更新内容
        // if (!id) event.emit("update-books");
        // if (id) event.emit("update-name", palnName);

        f7router.back();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!window) return;

    const picker = DatePicker({ hasFullYear: false }, (e) => {
      const _d = e.split("-").map((item) => parseInt(item));
      const _date = new Date(_d[0], _d[1], 0);
      const days = _date.getDate();

      const $date = new Date(`${e}-${days} 23:59:59`).toISOString();

      formik.current.setFieldValue("approximateAt", $date ? format($date, "YYYY-MM") : "");
      date.current = $date;
    });
    setPicker(picker);
  }, []);

  const _picker = () => picker.open();
  const openPicker = token && _picker;

  const onSelectType = (e: any) => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("data-name");
    formik.current.setFieldValue("expenseId", name);

    setPopupOpened(false);
  };

  const onTest = () => setPopupOpened(true);

  return (
    <Page noToolbar pageContent={true}>
      <Navbar backLink noHairline title={id ? "编辑计划" : "添加计划"}>
        <NavRight>
          <Button className="w-20" large small fill onClick={onSaveBefore}>
            <Icons name={!saving ? "save" : "spinner"} className={`mr-1 save-icon${!saving ? "" : " animate-spin"}`} />
            保存
          </Button>
        </NavRight>
      </Navbar>

      <div className="px-8 mt-10">
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
            console.log(values);
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
                onClick={onTest}
              />
              {/* <InputField
                label="大概完成时间"
                placeholder="请输入大概完成时间"
                autoComplete="off"
                value={values.expenseId}
                name="expenseId"
                readOnly={true}
                setFieldValue={setFieldValue}
                onClick={openPicker}
              /> */}

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

      <Popup opened={popupOpened} onPopupClosed={() => setPopupOpened(false)} push>
        <Page>
          <Navbar noHairline title="计划类型">
            <NavRight>
              <Button className="w-20" large small fill popupClose>
                关闭
              </Button>
              {/* <Link popupClose>关闭</Link> */}
            </NavRight>
          </Navbar>

          <div className="mt-7 grid grid-cols-3 gap-4 px-5 pb-10">
            {payDetails?.map((item) => {
              return (
                <div
                  className="shadow-3 rounded-lg py-3 px-4 link block my-0"
                  data-name={item.expenseName}
                  data-id={item.id}
                  onClick={onSelectType}
                >
                  <div className="flex justify-center pointer-events-none">
                    <Icons name="moon" className="" />
                  </div>
                  <div className="text-center mt-1 pointer-events-none">{item.expenseName}</div>
                </div>
              );
            })}
          </div>
        </Page>
      </Popup>
    </Page>
  );
};

export default memo(Modify);
