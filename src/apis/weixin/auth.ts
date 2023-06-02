export function wxLogin() {
  return new Promise<UniNamespace.LoginRes>((resolve, reject) => {
    uni.login({
      success(res: UniNamespace.LoginRes) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res.code);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

export function userInformation() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: "/user/info",
      method: "GET",
      header: {
        "x-freud": "52f4978a-58cc-4973-a254-fdd4f9e73751"
      },
      data: {},
      success(res) {
        if (res) {
          console.log(res);
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
