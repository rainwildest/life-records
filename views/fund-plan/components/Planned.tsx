import React, { useEffect } from "react";
import {
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  f7
} from "framework7-react";
import { relative } from "lib/api/dayjs";
import { thousands } from "lib/api/utils";
import DetailItem from "./DetailItem";
const Planned: React.FC = () => {
  const onDeleted = () => {
    f7.dialog.alert("Thanks, item removed!");
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     f7.swipeout.delete(".plant-item");
  //   }, 3000);
  // }, []);
  return (
    <List className="plant-items-container mb-10 !mt-3 pt-2 px-6">
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
          status="complete-02"
        />
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
