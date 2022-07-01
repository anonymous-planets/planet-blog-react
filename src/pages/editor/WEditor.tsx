import { useEffect } from "react";

export default function WEditor() {
  useEffect(() => {
    // npm install @types/jquery @types/summernote
    const config: Summernote.Options = {
      tabDisable: true, // 키보드 Tab키를 사용가능할게 할지(Default false)
      // toolbar에 넣을 항목들 정의
      toolbar: [
        // 작성해준 순서대로 toolbar에 삽입된다.
        // 중복으도 선언가능하며, toolbar삽입 위치를 자유롭게하기 위해서 중복으로 타입이 되어있어 보인다.
        ["font", ["bold", "italic", "underline", "superscript"]],
        ["fontsize", ["fontsize", "fontname", "color"]],
      ],

      // 사용하고 싶은 fontSize들만 정의
      fontSizes: ["10", "12", "14", "16"],

      // 사용하고 싶은 Color들 정의, [[[]]] 이란걸 주의하자!, 최종안에 배열의 색상값이 한줄에 표시된다.
      // 아래처럼 선언할시 첫번째줄 red 하나, 두번째줄 black하나, 세번째줄 yellow 하나 이렇게 나타난다.
      colors: [[["red"]], [["black"]], [["yellow"]]],

      // fontSize단위
      fontSizeUnits: ["px"],

      // placeholder이다.
      placeholder: "아무말이나 작성해주세요!",

      // tooltip에 언어를 설정하는것같은데, 사용을 원할 경우 언어 summernote-ko.js파일도 추가가 필요 해보인다.
      lang: "ko-KR",

      // !!중요!! Callback 함수, 많이 쓰일것같다.
      // 사용해본 몇가지만 작성할예정이며 이것저것 많아 보인다.
      callbacks: {
        onInit: () => {
          // editor가 초기화 되었을 때 이벤트 발생
        },
        onChange: (contents: string, $editable: JQuery) => {
          // editor내용이 변결 될때마다 이벤트 발생
        },
        onKeyup: (ev: KeyboardEvent) => {
          // keyboard버튼 눌렀다가 땠을 때 이벤트 발생
        },
        onKeydown: (ev: KeyboardEvent) => {
          // keyboard버튼 눌렀을 때 이벤트 발생
        },
        onPaste: (e: Event & { originalEvent: ClipboardEvent }) => {
          // editor에 붙여넣기 했을 때
          const clipboardData = e.originalEvent.clipboardData?.getData("text");
          console.log(clipboardData);
        },
      },
    };
    $("#summernote").summernote(config);
  }, []);

  const onEditorSaveHanlder = () => {
    const content = $("#summernote").summernote("code");

    console.log(content);
  };

  return (
    <>
      <div style={{ width: "800px" }}>
        <textarea id="summernote"></textarea>
      </div>
      <div>
        <button onClick={onEditorSaveHanlder}>저장!</button>
      </div>
    </>
  );
}
