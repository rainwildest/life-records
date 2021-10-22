import store from "lib/store";

type RedirectOptions = {
  redirect?: any;
  login?: any;
};
const onRedirect = (resolve, options: RedirectOptions) => {
  const {
    redirect: { url, query: redirectQuery },
    login: { query: loginQuery }
  } = options;

  const token = store.getters.token;
  const route = token.value
    ? `${url}${redirectQuery ? `?${redirectQuery}` : ""}`
    : `/login${loginQuery ? `?${loginQuery}` : ""}`;
  resolve(route);
};

export declare type RoutesHandleOptions = {
  url: string;
  redirect?: boolean;
  async?: boolean;
  options?: any;
  additional?: any;
  importURL?: React.ReactNode;
  component?: React.ReactNode;
};

export const routesHandle = (
  routes: RoutesHandleOptions[],
  options: { [key: string]: any }
): any => {
  const _routes = [];

  routes.forEach((item) => {
    let route = {
      path: `/${item.redirect ? "route-" : ""}${item.url}`,
      name: `${item.redirect ? "route-" : ""}${item.url}`,
      options: item.options || options
    };
    const type = item.async ? "asyncComponent" : "component";

    if (item.component) route[type] = item.component;
    if (item?.additional) route = { ...route, ...item.additional };

    _routes.push(route);

    if (item.redirect) {
      _routes.push({
        path: `/${item.url}`,
        name: `${item.url}`,
        redirect: function ({ to, resolve }): void {
          onRedirect(resolve, {
            redirect: { url: `/route-${item.url}` },
            login: { query: `to=${to.route.path}` }
          });
        },
        options
      });
    }
  });

  return _routes;
};
