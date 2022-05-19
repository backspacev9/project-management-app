import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBoardByID, getBoards } from '../../redux/boards-reducer';
import { getColumns } from '../../redux/columns-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import Board from './components/Board/board-item';
import Column from './components/Board/column-item';
import BoardHeader from './components/Board/header';

const BoardPage = () => {
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  const setBoard = async () => {
    if (id) {
      await dispatch(getBoardByID({ token, id }));
      await dispatch(getColumns({ token, id }));
    }
  };
  useEffect(() => {
    setBoard();
    console.log(currentBoard);
  }, []);

  return (
    <>
      <BoardHeader title={currentBoard.title} />
      <Board />
    </>
  );
};

export default BoardPage;
