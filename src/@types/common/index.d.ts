interface FileUploadRequest {
  files: FormData
}

interface FileItem {
  idx:number;
  originalFilename:string;
  fileExtension:string;
  fileSize:number;
}