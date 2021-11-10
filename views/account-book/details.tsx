import React from "react";
import { Page, Navbar, NavTitle } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import { useCostDetailsQuery } from "apollo/graphql/model/cost-details.graphql";
import Icons from "components/Icons";
import Amounts from "components/Amounts";
import { thousands } from "lib/api/utils";
import { format, relative } from "lib/api/dayjs";
import CostCard from "components/CostCard";

const Details: React.FC<RouterOpotions> = ({ f7route }) => {
  const { id, name } = f7route.query;
  const { data } = useCostDetailsQuery({
    variables: { input: { bookId: id } }
  });
  const details = data?.costDetails || [];

  return (
    <Page noToolbar>
      <Navbar backLink noHairline>
        <NavTitle className="w-48 truncate">{name}</NavTitle>
      </Navbar>

      <div className="pt-2 px-6 mt-10">
        <Amounts pay={thousands(0)} income={thousands(0)} />

        {details.map((detail) => (
          <CostCard
            className="mt-8"
            key={detail.id}
            type={detail.expense.expenseType}
            typeName={detail.expense.expenseName}
            time={format(detail.purchaseTime)}
            amounts={thousands(detail.amounts)}
            remarks={detail.remarks}
          />
        ))}
      </div>
    </Page>
  );
};

export default Details;
