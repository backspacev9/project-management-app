export interface IBoard {
  id: string;
  title: string;
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IApiTask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
