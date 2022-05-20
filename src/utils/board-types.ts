import { IColumnWithTasks } from './columns-type';

export interface IBoard {
  id: string;
  title: string;
}
export interface IBoardWithColumns {
  id: string;
  title: string;
  columns: Array<IColumnWithTasks>;
}
