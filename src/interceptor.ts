export function createInterceptors() {
  uni.addInterceptor("request", {
    invoke(args: UniNamespace.RequestOptions) {
      if (args.url[0] === "/") {
        args.url = import.meta.env.VITE_BASIC_URL + args.url;
        args.header = {
          "x-freud": uni.getStorageSync("accessToken")
        };
      }
    },
    fail() {
      uni.showToast({
        title: "网络异常",
        icon: "error"
      });
    }
  });
}