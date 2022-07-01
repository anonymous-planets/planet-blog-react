import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosDefaultInstance = axios.create({
  baseURL : "http://localhost:9999"
});

/**
 *  수정 중....
 * @param response
 * @returns 
 */
const responseBody = <T>(response:AxiosResponse<ApiResponse<T>>):ApiResponse<T> => {
  const data:ApiResponse<T> = response.data;
  // data.httpStatus = response?.status;
  // data.httpStatusText = response?.statusText;
  return data;
};

/**
 * 좀 더 이쁘게 수정하기
 * @param res 
 * @returns 
 */
const successCallBack = <T>(res:AxiosResponse<ApiResponse<T>>):ApiResponse<T> => {
  // successCallBack 공통 처리항목 있을 경우 사용
  return responseBody(res);
}

/**
 * 좀더 이쁘게 수정하기
 * @param errorRes
 * @returns 
 */
const errorCallBack = <T>(errorRes:AxiosError<ApiResponse<T>>):ApiResponse<T> => {
  // ErrorCallBack 공통 처리 항목 있을 경우 사용
  return responseBody(errorRes.response as AxiosResponse<ApiResponse<T>, any>);
};

/**
 * 수정중
 */
export const AUTH_REQUEST = {
  // QT : RequestType, ST : ResponseType
  get:<QT, ST>(endPoint:string, parameters?:QT):Promise<ApiResponse<ST>> => axiosDefaultInstance.get(endPoint, { params : parameters }).then(res => successCallBack<ST>(res)).catch((error) => {throw errorCallBack<ST>(error);}),
  post:<QT, ST>(endPoint:string, parameters?:QT, options?:{}):Promise<ApiResponse<ST>> => axiosDefaultInstance.post(endPoint, parameters, options).then((res) => successCallBack<ST>(res)).catch((error) => {throw errorCallBack<ST>(error);}),
  patch:<QT, ST>(endPoint:string, parameters?:QT):Promise<ApiResponse<ST>> => axiosDefaultInstance.patch(endPoint, parameters).then((res) => successCallBack<ST>(res)).catch((error) => {throw errorCallBack<ST>(error);}),
  delete:<QT, ST>(endPoint:string, parameters?:QT):Promise<ApiResponse<ST>> => axiosDefaultInstance.delete(endPoint, {params : parameters}).then((res) => successCallBack<ST>(res)).catch((error) => {throw errorCallBack<ST>(error);})
}