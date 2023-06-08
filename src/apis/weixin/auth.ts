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
export function wxRegister() {
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
