export type PostType = {
  id: number;
  writer: string;
  title: string;
  content: string;
  file?: string; // 업로드 파일 optional
  wdate?: string; // 작성일 optional (작성할 때는 x, 불러올 때는 o)
};
