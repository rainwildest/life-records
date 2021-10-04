type RequestOptions = {
  url: string;
  data?: any;
  method?: "POST" | "GET";
  headers?: HeadersInit;
  time?: number;
};
type ResponseOptions = {
  code: number;
  data: any;
  error: string;
};
const request = (args: RequestOptions): Promise<ResponseOptions> => {
  const controller = new AbortController();
  const {
    url,
    data,
    method = "GET",
    headers = { "Content-Type": "application/json" },
    time = 30
  } = args;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      controller.abort();
    }, 1000 * time);

    fetch(url, {
      signal: controller.signal,
      method: method,
      headers,
      body: data
    })
      .then(async (res) => {
        resolve(await res.json());
        clearTimeout(timer);
      })
      .catch((error) => {
        reject(error);
        clearTimeout(timer);
      });
  });
};

export default request;
