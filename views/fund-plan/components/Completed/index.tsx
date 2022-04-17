import React from "react";
import { List, ListItem, SwipeoutActions, SwipeoutButton } from "framework7-react";
import { relative } from "lib/apis/dayjs";
import { thousands } from "lib/apis/utils";
import DetailItem from "../DetailItem";

const Completed: React.FC = () => {
  return (
    <List className="plant-items-container pt-2 px-6 mb-10 mt-6">
      <ListItem
        className="plant-item shadow-3 rounded-lg"
        divider={false}
        swipeout
        // onSwipeoutDeleted={onDeleted}
      >
        <DetailItem
          slot="title"
          type="数码"
          name="Macbook pro"
          icon="budget"
          date={relative("2021-12-30")}
          amounts={thousands(10000)}
        />
        <SwipeoutActions className="flex items-center" right>
          <SwipeoutButton
            className="plant-operation link !text-sm !font-bold"
            color="green"
            confirmText="sfjlksjf"
            confirmTitle="删除确定"
          >
            完 成
          </SwipeoutButton>
          <SwipeoutButton className="plant-operation link !text-sm !font-bold" delete>
            删 除
          </SwipeoutButton>
        </SwipeoutActions>
      </ListItem>
    </List>
  );
};

export default Completed;
