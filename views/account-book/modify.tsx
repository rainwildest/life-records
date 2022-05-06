import React, { useState, useRef, memo } from "react";
import { Page, Navbar, NavRight, Button } from "framework7-react";
import { Icons, InputField } from "components";
import { useCreateAccountBooksMutation, useModifyAccountBooksMutation } from "graphql/model/account-books.graphql";
import { RouterProps } from "typings/f7-route";
import event from "lib/apis/framework-event";
import { toastTip } from "lib/apis/utils";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import _ from "lodash";

const AccountBook: React.FC<RouterProps> = ({ f7router, f7route }) => {
  const { id, name } = f7route.query;
  const formik = useRef<FormikProps<any>>();
  const [saving, setSaving] = useState(false);
  const [createAccountBooks] = useCreateAccountBooksMutation();
  const [modifyAccountBooks] = useModifyAccountBooksMutation();

  const fields = {
    name: name || ""
  };

  const onSaveBefore = () => {
    formik.current.submitForm().then(() => {
      const errors = formik.current.errors;
      const keys = _.keys(errors);

      if (!keys.length) {
        setSaving(true);
        return;
      }

      for (let i = 0; i < keys.length; ++i) {
        toastTip(errors[keys[i]] as string);
        break;
      }
    });
  };

  const onSubmit = (values: typeof fields) => {
    const _operation = id ? modifyAccountBooks : createAccountBooks;
    const _param: any = id ? { id } : {};
    const variables = { name: values.name, ..._param };

    _operation({ variables })
      .then(() => {
        // 提送消息更新内容
        if (!id) event.emit("update-books");
        if (id) event.emit("update-name", values.name);

        f7router.back();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(20, "账簿名称至少1到20个字").required("请输入账簿名称")
  });

  return (
    <Page noToolbar>
      <Navbar className="h-12" backLink noHairline title={id ? "编辑账簿" : "新增账簿"}>
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

      <div className="px-8 mt-10">
        <Formik innerRef={formik} validationSchema={validationSchema} initialValues={fields} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <InputField
                label="账簿名称"
                placeholder="请输入账簿名称"
                autoComplete="off"
                value={values.name}
                name="name"
                setFieldValue={setFieldValue}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Page>
  );
};

export default memo(AccountBook);
