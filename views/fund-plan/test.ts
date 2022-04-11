import { useFundPlanByIdQuery, FundPlanByIdQuery } from "apollo/graphql/model/fund-plan.graphql";

const useList = (id: string): { data: FundPlanByIdQuery; refetch: any } => {
  if (!id) return { data: null, refetch: null };

  const { data, refetch } = useFundPlanByIdQuery({
    variables: { id },
    fetchPolicy: "network-only"
  });

  return { data, refetch };
};

export default useList;
