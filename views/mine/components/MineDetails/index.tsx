import React, { memo, Fragment, useEffect } from "react";
import { BlockHeader, Link, useStore } from "framework7-react";
import { useUserQuery } from "graphql/model/user.graphql";
import _ from "lodash";
import Icons from "components/Icons";
import { statisticsHandle } from "../../utils";

const MineDetails: React.FC = () => {
  const token = useStore("token");
  const { data, loading, refetch } = useUserQuery();
  const user = data?.user;
  const contrast = { days: "当天", months: "当月", years: "今年" };
  const statistics = statisticsHandle(user?.statistics, contrast);

  useEffect(() => {
    token && refetch();
  }, [token]);

  const hasLogged = !loading && token;
  const accSkeleton = token && loading ? " skeleton-text skeleton-effect-wave" : "";
  const accOpacity = !token ? " opacity-0" : "";
  const accClassName = `${accSkeleton}${accOpacity}`;

  return (
    <Fragment>
      <div className="mine-bg-color flex flex-col items-center p-16 mx-3 rounded-3xl mt-5 shadow-3">
        <div className="p-2.5 w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <Icons className="svg-icon-full" name={token && user?.avatar ? user?.avatar : "avatar-11"} />
        </div>

        <section className="relative mt-5">
          {!token && (
            <section className="absolute top-0 left-1/2 -translate-x-1/2 w-full z-10">
              <Link href="/login">
                <div className="inline-block w-28 rounded-full text-center bg-white text-sm py-2">登 录</div>
              </Link>
            </section>
          )}
          <section className={`text-center ${accClassName}`}>
            <div className="text-xl font-bold">{hasLogged ? user?.username : "xxxxxxxx"}</div>
            <div className="text-sm mt-1 font-medium">{hasLogged ? user?.email : "xxxxxxxxxxxxxxxx"}</div>
          </section>
        </section>
      </div>

      {token &&
        statistics.map((item) => {
          return (
            <Fragment key={item.title}>
              <BlockHeader className="mt-7 font-bold">{item.title}</BlockHeader>
              <div className="mine-container p-2.5 mx-3 rounded-lg grid grid-cols-3 gap-2.5 mt-1 shadow-3">
                {_.keys(contrast).map((key) => {
                  return (
                    <section
                      key={key}
                      className={`rounded-lg px-1 py-4 block my-0 text-center font-bold text-xs leading-loose shadow-2 ${item.color}`}
                    >
                      <div className="leading-none">{item[key].title}</div>
                      <div className="truncate leading-none mt-2">{item[key].total}</div>
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
