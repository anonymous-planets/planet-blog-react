import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <Link to="/layout">Route/Layout</Link>
      <br />
      <Link to="/files">파일 업로드/다운로드</Link>
      <br />
      <Link to="/editor">Web Editor(Summernote)</Link>
    </>
  );
}
