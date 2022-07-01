import FileDownForm from 'components/files/FileDownForm';
import FileUploadForm from 'components/files/FileUploadForm';
import { useState } from 'react';

export default function FileUploadPage() {
  const [fileItems, setFileItems] = useState<Array<FileItem>>([]);
  return (
    <>
      <FileUploadForm fileItems = {fileItems} setFileItems={setFileItems}/>
      <hr/>
      <FileDownForm fileItems={fileItems}/>
    </>
  );
}

