import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavRight,
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  BlockTitle,
  useStore,
  f7,
  Link,
  Button,
  Popup,
  Block
} from "framework7-react";
import Icons from "components/Icons";
import { toastTip } from "lib/api/utils";
import { RouterOpotions } from "typings/f7-route";
import event from "lib/api/framework-event";
import Input from "./components/Input";
import {
  useCreateFundPlanMutation,
  useModifyFundPlanMutation
} from "apollo/graphql/model/fund-plan.graphql";
import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import DatePicker from "components/DatePicker";
import { format } from "lib/api/dayjs";

const Modify: React.FC<RouterOpotions> = ({ f7router, f7route }) => {
  const { id } = f7route.query;
  const token = useStore("token");

  const [date, setDate] = useState("");
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
      approximateAt: date
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

  const onInput = (e) => {
    setPalnName(e);
  };

  useEffect(() => {
    if (!window) return;

    const picker = DatePicker({ hasFullYear: false }, (e) => {
      const _d = e.split("-").map((item) => parseInt(item));
      const _date = new Date(_d[0], _d[1], 0);
      const days = _date.getDate();

      setDate(new Date(`${e}-${days} 23:59:59`).toISOString());
    });
    setPicker(picker);
  }, []);

  const _picker = () => picker.open();
  const openPicker = token && _picker;

  return (
    <Page noToolbar pageContent={true}>
      <Navbar backLink noHairline title={id ? "编辑计划" : "添加计划"}>
        <NavRight>
          <Button className="w-20" large small fill onClick={onSaveBefore}>
            <Icons
              name={!saving ? "save" : "spinner"}
              className={`mr-1 save-icon${!saving ? "" : " animate-spin"}`}
            />
            保存
          </Button>
        </NavRight>
      </Navbar>

      <div className="px-8 mt-10">
        <div className="text-gray-700 font-bold text-sm mb-3 pl-2">
          计划类型
        </div>
        <Input
          value={palnName}
          placeholder="请输入计划类型"
          readOnly={true}
          onChange={onInput}
          onClick={() => setPopupOpened(true)}
        />

        <div className="text-gray-700 font-bold text-sm mt-5 mb-3 pl-2">
          计划名称
        </div>
        <Input
          value={palnName}
          placeholder="请输入计划名称"
          onChange={onInput}
        />

        <div className="text-gray-700 font-bold text-sm mt-5 mb-3 pl-2">
          金额
        </div>
        <Input
          type="number"
          value={palnName}
          placeholder="请输入金额"
          onChange={onInput}
        />

        <div className="text-gray-700 font-bold text-sm mt-5 mb-3 pl-2">
          大概完成时间
        </div>
        <Input
          value={date ? format(date, "YYYY-MM") : ""}
          placeholder="请输入大概完成时间"
          readOnly={true}
          onChange={onInput}
          onClick={openPicker}
        />
      </div>

      <Popup
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
        push
      >
        <Page>
          <Navbar noHairline title="计划类型">
            <NavRight>
              <Link popupClose>关闭</Link>
            </NavRight>
          </Navbar>
        </Page>
      </Popup>
    </Page>
  );
};

export default Modify;
