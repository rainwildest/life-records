export { default } from "views/loginPage";
// import { GetServerSideProps } from "next";
// export const getServerSideProps:GetServerSideProps = async ({ req, res, query }) => {
//   /* 在服务器期间检查用户的登录情况 */
//   const { default: hasSignIn } = require('lib/api/verifySignIn')
//   const shouldRedirect = await hasSignIn(req, res)
//   /* ***************************************************** */

//   /* 如果已经有登录了就直接跳回首页 */
//   if (shouldRedirect) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }
