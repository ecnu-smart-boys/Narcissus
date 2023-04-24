interface Resp<T> {
  status: number;
  message: string;
  data: T;
}

export interface Req {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  header?: any;
}

export function request<T>(req: Req) {
  const { url, method, data, header } = req;
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url,
      data,
      method,
      header,
      success(res) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const { status, message, data } = res.data as Resp<T>;
        if (status !== 200) {
          reject(message);
        }
        resolve(data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
