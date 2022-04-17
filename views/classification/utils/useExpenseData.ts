import { useLivingExpensesByIdQuery, LivingExpensesByIdQuery } from "graphql/model/living-expenses.graphql";

const useExpense = (id: string): { data: LivingExpensesByIdQuery; refetch: any } => {
  if (!id) return { data: null, refetch: null };

  const { data, refetch } = useLivingExpensesByIdQuery({
    variables: { id },
    fetchPolicy: "network-only"
  });

  return { data, refetch };
};

export default useExpense;
