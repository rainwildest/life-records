import React, { Fragment, memo } from "react";
import Icons from "components/Icons";
import {
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  f7
} from "framework7-react";
import { relative } from "lib/api/dayjs";
import { thousands } from "lib/api/utils";

type DetailOptions = {
  slot?: string;
  type?: string;
  name?: string;
  date?: string;
  icon?: string;
  amounts?: string;
  status?: string;
};
const DetailItem: React.FC<DetailOptions> = ({
  date,
  type,
  icon,
  name,
  amounts,
  status
}) => (
  <div className="py-3 px-4 relative overflow-hidden w-full flex items-center">
    <Icons name={icon} className="budget-icon pr-3" />
    <div className="cost-item-container">
      <div className="flex justify-between">
        <div className="text-gray-500 text-xs">{type}</div>
        <div className="text-gray-500 text-xs">{date}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-600 mt-2 text-sm truncate">{name}</div>
        <div className="mt-2 text-sm font-bold text-gray-600 flex-shrink-0">
          ￥{amounts}
        </div>
      </div>
    </div>

    {status && (
      <Icons
        name={status}
        className="budget-status-icon pr-3 absolute right-0 -top-0.5 opacity-60"
      />
    )}
  </div>
);

export default memo(DetailItem);
