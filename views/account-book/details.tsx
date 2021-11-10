import React from "react";
import { Page, Navbar } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import { useCostDetailsQuery } from "apollo/graphql/model/cost-details.graphql";

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
    </Page>
  );
};

export default Details;
