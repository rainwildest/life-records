import React, { Fragment } from "react";
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
}) => {
  return (
    <div slot="title" className="py-3 px-4 flex justify-between relative">
      <div className="budget-title flex items-center flex-shrink-0 text-sm">
        <Icons name={icon} className="budget-icon pr-3" />
        <div>
          <div className="text-gray-500 text-xs">{type}</div>
          <div className="truncate text-gray-600 mt-2">{name}</div>
        </div>
      </div>

      <div className="rounded-lg w-auto px-3 box-border text-right overflow-hidden">
        <div className="text-gray-500 text-xs">{date}</div>
        <div className="text-gray-600 mt-2 text-sm font-bold">{amounts}</div>
      </div>

      {status && (
        <Icons
          name={status}
          className="budget-status-icon pr-3 absolute right-0 -top-0.5 opacity-60"
        />
      )}
    </div>
  );
};

export default DetailItem;
