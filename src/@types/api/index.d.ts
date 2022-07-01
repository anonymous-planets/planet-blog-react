
/**
 * 공통 응답 타입
 */
interface ApiResponse<T> {
  resultCode:number;
  message:string;
  data:T;
  timestamp:number;
  error?:ErrorSet;
}

/**
 * 간단한 ErrorSet
 */
interface ErrorSet {
  errorCode : string;
  errorMessage : string;
  alertMessage? : string;
}