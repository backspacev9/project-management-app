export interface BoardInteface {
  id: string;
  title: string;
  columns: Array<ColumnInteface>;
}

export interface ColumnInteface {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskInterface>;
}
export interface TaskInterface {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Array<FileInterface>;
}
export interface FileInterface {
  filename: string;
  fileSize: number;
}
