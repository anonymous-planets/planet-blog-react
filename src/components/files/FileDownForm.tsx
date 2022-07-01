import { axiosDefaultInstance } from 'apis';

/**
 * 다운로드 컴포넌트
 * 방법1. href 속성에 직접 파일을 다운로드 받을 수 있는 api endpoint를 삽입한다.
 * 방법2. Axios를 이용해서 다운로드 받을 파일 데이터를 요청하고, a태그를 만들고 href속성에 파일 정보를 넣고 해서 다운을 받는다.
 * 
 * (방법1)이 (방법2) 보다 간단해 보인다.
 * 하지만 (방법2)로 밖에 못하는 경우가 있을 수 있다고 생각한다.
 * 예를 들어서 axios instance를 반드시 이용해서 API요청이 필요한 경우다.
 * (axios instance header에 로그인 정보 같은게 있는경우 랄까... 이부분은 확실치 않다 개인적인 생각이라) 
 * @param param0 
 * @returns 
 */
export default function FileDownForm({fileItems} : {fileItems:Array<FileItem>}) {

  const downloadHandler = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, idx:number) => {
    // 파일 데이터 조회(!중요! responseType에 blob으로 준다, arryBuffer을 주는 방법도 있는것 같다.)
    // !!responseType을 설정해주는 위치를 헷갈리지 말자(Header에 주는게 아니다)!!
    const axiosResponse = await axiosDefaultInstance.get(`/files/download/${idx}`,{"responseType" : "blob"});

    // a태그 Element를 생성해준다.
    const aElement = document.createElement('a');
    // 위에서 생성한 aElement변수에 href속성에 넣을 데이터를 설정해준다.
    const blobFile = window.URL.createObjectURL(new Blob([axiosResponse.data]));
    aElement.href = blobFile;
    
    // !중요! 파일명 설정 부분이다.
    // download속성에는 확장자를 포함한 파일명 값이 들어간다.
    // 서버에서 응답데이터를 binary 파일 데이터만 줄것이다.
    // 파일명을 설정해야 할텐데 파일명은 Header의 값중 content-disposition에 들어있다.(없다면 백엔드개발자에게 넣어 달라고하자)
    // content-disposition에 undefined로 나올 경우 서버쪽에서 해당 Header에 접근 할수 있도록 설정을 해줘야한다.(CORS)
    // contentDisposition = attachment; filename=test.png
    const contentDisposition:string = axiosResponse.headers['content-disposition'];
    if(contentDisposition) {
      // X이부분은 참고하지말자 너무 위험하다..X
      const filename = contentDisposition.split(';')[1].trim().split('=')
      // 파일명 설정
      aElement.download = filename[1];
    }

    // document body 위에 생성한 a태그를 부착 시킨다.
    document.body.appendChild(aElement);

    // 부착 시킨 a태그를 Click!(이벤트 발생 시키기) 그러면 다운로드가 된다.
    aElement.click();
    setTimeout(() => {
      // 이제 더이상 필요 없으니 생성한 a태그를 1초후 삭제 시켜준다.
      aElement.remove();
    }, 1000);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>원본 파일명</th>
            <th>확장자</th>
            <th>파일용량(KB)</th>
            <th>다운로드</th>
          </tr>
        </thead>
        <tbody>
          {fileItems.map(item => (
            <tr key={item.idx}>
              <td>{item.idx}</td>
              <td>{item.originalFilename}</td>
              <td>{item.fileExtension}</td>
              <td>{item.fileSize/1024}</td>
              {/* 왼쪽 : 방법1, 오른쪽 : 방법2 */}
              <td>{item.idx%2 ? <a href={`http://localhost:9999/files/download/${item.idx}`} download>다운로드</a> : <button onClick={(e) => {downloadHandler(e, item.idx)}}>다운로드</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}