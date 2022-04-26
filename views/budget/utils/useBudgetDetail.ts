import { useGetBudgetDetailQuery, GetBudgetDetailQuery } from "graphql/model/budget.graphql";

const useBudgetDetail = (id: string): { data: GetBudgetDetailQuery; refetch: any } => {
  if (!id) return { data: null, refetch: null };

  const { data, refetch } = useGetBudgetDetailQuery({
    variables: { id },
    fetchPolicy: "network-only"
  });

  return { data, refetch };
};

export default useBudgetDetail;
