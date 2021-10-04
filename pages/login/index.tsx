import { GetServerSideProps } from "next";
export { default } from "views/login";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query
}) => {
  console.log(
    "login============================================================================="
  );
  return {
    props: {}
  };
};
