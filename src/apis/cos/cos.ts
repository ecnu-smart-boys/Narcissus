import { PutObjectReq } from "@/apis/cos/cos-interface";
/**
 * @description 使用PUT方法上传文件至COS
 */
export async function saveAvatar(req: PutObjectReq): Promise<string> {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: import.meta.env.VITE_BASIC_URL + "/user/saveAvatar",
      filePath: req.filePath,
      name: "file",
      success: (uploadFileRes) => {
        resolve(uploadFileRes.data);
      },
      fail: (uploadFileRes) => {
        reject(uploadFileRes);
      },
      header: {
        "x-freud": uni.getStorageSync("accessToken")
      }
    });
  });
}
