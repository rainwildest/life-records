import React from "react";
import { Page, Navbar } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import { useCostDetailsQuery } from "apollo/graphql/model/cost-details.graphql";
import Icons from "components/Icons";

const Details: React.FC<RouterOpotions> = ({ f7route }) => {
  const { id } = f7route.query;
  const { data } = useCostDetailsQuery({
    variables: { input: { bookId: id } }
  });
  const details = data?.costDetails || [];
  console.log(data);
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="账簿详情"></Navbar>

      <div className="pt-2 px-6 mt-10">
        <div className="shadow-3 rounded-lg py-3 px-4 relative overflow-hidden w-full flex items-center">
          <Icons name="moon" className="budget-icon pr-3" />
          <div className="cost-item-container">
            <div className="flex justify-between">
              <div className="text-gray-500 text-xs">车费</div>
              <div className="text-gray-500 text-xs">一天</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600 mt-2 text-sm truncate">
                水电费第三方jkl;jkljlk极乐空间记录卡接口连接拉开距离
              </div>
              <div className="mt-2 text-sm font-bold text-green-500 flex-shrink-0">
                -￥1000
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Details;
