import { axiosDefaultInstance } from 'apis';
import { useState } from 'react';

export default function FileUploadForm({fileItems, setFileItems} :{fileItems:Array<FileItem>, setFileItems: React.Dispatch<React.SetStateAction<FileItem[]>>}) {
  // 업로드할 파일들을 담을 State!
  const [file, setFile] = useState<File>();

  // 허용가능한 확장자 목록!
  const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;  // 5MB

  /**
   * 파일 선택 onChangeHandler
   * 해당 method에서는 업로드할 파일에대해서 validaion을 하고
   * file state에 값을 할당한다
   * @param e 
   * @returns 
   */
  const fileUploadValidHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if(files === undefined) {
      return ;
    }

    // 파일 확장자 체크
    if(!fileExtensionValid(files)) {
      target.value = '';
      alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`)
      return;
    }

    // 파일 용량 체크
    if(files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ')
      return;
    }

    // validation을 정상적으로 통과한 File
    setFile(files);
  }


  /**
   * 파일업로드 버튼 클릭 Handler
   * 해당 method에서는 api를 호출해 file을 백엔드로 전송하고, 응답값에 대한 처리를 해준다.
   */
  const fileUploadHandler = async () => {
    // narrowing(?)
    if(file !== undefined) {
      try{
        // !!중요1. formData활용!!
        const formData = new FormData();
        formData.append('file', file);

        // Axios를 이용해서 Back-End로 파일 업로드 요청!
        // !!중요2. header에 content-type에 multipart/form-data를 설정!!
        const axiosResponse = await axiosDefaultInstance.post<ApiResponse<FileItem>>("/files", formData, {"headers" : {"content-type" : "multipart/form-data"}})

        // HttpStatus가 200번호 구역이 아니거나
        // 서버에서 응답 코드로 0(성공)을 주지 않았을 경우
        if(axiosResponse.status < 200 || axiosResponse.status >= 300 || axiosResponse.data.resultCode !== 0){
          // Error를 발생시켜 Catch문을 타게 만들어주는데, 서버에 응답받은 메시지를 넣어준다!
          // 서버에서 응답 메시지를 받지 못했을경우 기본 메시지 설정또한 함께 해준다
          throw Error(axiosResponse.data.message ?? "문제가 발생했어요!");
        }
        // 파일 업로드 성공!
        alert('파일 업로드 성공!')
        const res:FileItem = axiosResponse.data.data;
        setFileItems([...fileItems, {...res}])
      } catch(e) {
        console.error(e);
        alert((e as {message : string}).message);
      }
    }
  }

  // ----------------------------------------------------------------

  /**
   * 파일 확장자를 검사해주는 함수이다.
   * @param param
   * @returns true: 가능 확장자, false : 불가능 확장자 
   */
  const fileExtensionValid = ({name} : {name : string}):boolean =>{
    // 파일 확장자
    const extension = removeFileName(name);

    /**
     * 허용가능한 확장자가 있는지 확인하는 부분은 indexOf를 사용해도 괜찮고, 
     * 새롭게 나온 includes를 사용해도 괜찮고, 그밖의 다른 방법을 사용해도 좋다.
     * 성능과 취향의 따라 사용하면 될것같다.
     * 
     * indexOf의 경우
     * 허용가능한 확장자가 있을경우 
     * ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치값을 반환
     */
    if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
      // 해당 if문이 수행되는 조건은
      // 1. 허용하지 않은 확장자일경우
      // 2. 확장자가 없는경우이다.
      return false;
    }
    return true;
  }

  /**
   * 해당 함수의 기능은 .을 제거한 순수 파일 확장자를 return해준다.
   * @param originalFileName 업로드할 파일명
   * @returns .을 제거한 순수 파일 확장자(png, jpg 등)
   */
  const removeFileName = (originalFileName:string):string => {
    // 마지막 .의 위치를 구한다
    // 마지막 .의 위치다음이 파일 확장자를 의미한다
    const lastIndex = originalFileName.lastIndexOf(".");

    // 파일 이름에서 .이 존재하지 않는 경우이다.
    // 이경우 파일 확장자가 존재하지 않는경우(?)를 의미한다.
    if(lastIndex < 0) {
      return "";
    }

    // substring을 함수를 이용해 확장자만 잘라준다
    // lastIndex의 값은 마지막 .의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열을 잘라준다.
    // 문자열을 자른 후 소문자로 변경시켜 확장자 값을 반환 해준다.
    return originalFileName.substring(lastIndex+1).toLocaleLowerCase();
  }



  return (
    <>
      <h1>파일 업로드</h1>
      <input type="file" onChange={fileUploadValidHandler}/>
      <br/><br/><br/>
      <button onClick={fileUploadHandler}>파일 업로드 하기</button>
    </>
  )
}