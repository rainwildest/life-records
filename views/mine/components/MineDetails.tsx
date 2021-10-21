import React, { memo, Fragment } from "react";
import { BlockHeader } from "framework7-react";
import { thousands } from "lib/api/utils";
import Icons from "components/Icons";
import { useUserQuery } from "apollo/graphql/model/user.graphql";
import _ from "lodash";
const MineDetails: React.FC = () => {
  const { data, loading } = useUserQuery();
  const statistics = [];
  const user = data?.user;
  const contrast = { days: "当天", months: "当月", years: "今年" };

  _.keys(user?.statistics).forEach((key) => {
    if (key === "__typename") return;
    const color = key === "pay" ? "text-green-500" : "text-red-700";
    const title = key === "pay" ? "支出统计" : "收入统计";
    const fields = { color, title };
    const _details = user.statistics[key];

    _.keys(_details).forEach((dateKey) => {
      if (dateKey === "__typename") return;
      const type = key === "pay" ? "支出" : "收入";
      fields[dateKey] = {
        total: thousands(_details[dateKey]),
        title: `${contrast[dateKey]}${type}`
      };
    });

    statistics.push({ ...fields });
  });

  return (
    <Fragment>
      <div className="mine-bg-color flex flex-col items-center p-16 mx-3 rounded-3xl mt-3 shadow-3">
        <div className="mine-avatar w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <Icons name="moon" />
        </div>
        {loading && (
          <section className="text-center mt-3 skeleton-text skeleton-effect-wave">
            <div className="text-xl font-bold">xxxxxxxx</div>
            <div className="text-sm font-medium">xxxxxxxxxxxxxxxx</div>
          </section>
        )}
        {!loading && (
          <section className="text-center mt-3">
            <div className="text-xl font-bold">{user?.username}</div>
            <div className="text-sm font-medium">{user?.email}</div>
          </section>
        )}
      </div>

      {statistics.map((item) => {
        return (
          <Fragment key={item.title}>
            <BlockHeader className="mt-7 font-bold">{item.title}</BlockHeader>
            <div className="mine-container p-2 mx-3 rounded-lg grid grid-cols-3 gap-2 mt-1 shadow-3">
              {_.keys(contrast).map((key) => {
                return (
                  <section
                    key={key}
                    className={`rounded px-1 py-4 block my-0 text-center font-bold text-xs leading-loose shadow-2 ${item.color}`}
                  >
                    <div className="leading-none">{item[key].title}</div>
                    <div className="truncate leading-none mt-2">
                      {item[key].total}
                    </div>
                  </section>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default memo(MineDetails);
