import { useFundPlanByIdQuery, FundPlanByIdQuery } from "graphql/model/fund-plan.graphql";

const usePlanData = (id: string): { data: FundPlanByIdQuery; refetch: any } => {
  if (!id) return { data: null, refetch: null };

  const { data, refetch } = useFundPlanByIdQuery({
    variables: { id },
    fetchPolicy: "network-only"
  });

  return { data, refetch };
};

export default usePlanData;
