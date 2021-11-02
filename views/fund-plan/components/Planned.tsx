import React from "react";
import {
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  f7
} from "framework7-react";
import Icons from "components/Icons";
import { relative } from "lib/api/dayjs";

const Planned: React.FC = () => {
  const onDeleted = () => {
    f7.dialog.alert("Thanks, item removed!");
  };
  return (
    <List className="plant-items-container pt-2 px-6 mb-10 mt-6">
      <ListItem
        className="plant-item shadow-3 rounded-lg"
        divider={false}
        swipeout
        onSwipeoutDeleted={onDeleted}
      >
        <div slot="title" className="py-3 px-4 flex justify-between">
          <div className="budget-title flex items-center flex-shrink-0 text-sm">
            <Icons name="budget" className="budget-icon pr-3" />
            <div>
              <div className="text-gray-500 text-xs">数码</div>
              <div className="truncate text-gray-600 mt-2">Macbook pro</div>
            </div>
          </div>

          <div className="rounded-lg w-auto px-3 box-border text-right overflow-hidden">
            <div className="text-gray-500 text-xs">
              {relative("2021-11-30")}
            </div>
            <div className="text-gray-600 mt-2 text-sm font-bold">1,000</div>
          </div>
        </div>
        <SwipeoutActions className="flex items-center" right>
          <SwipeoutButton
            className="plant-operation link !text-sm !font-bold"
            color="green"
          >
            完 成
          </SwipeoutButton>
          <SwipeoutButton
            className="plant-operation link !text-sm !font-bold"
            confirmText="是否确定删除"
            confirmTitle="提示"
            delete
          >
            删 除
          </SwipeoutButton>
        </SwipeoutActions>
      </ListItem>
    </List>
  );
};

export default Planned;
