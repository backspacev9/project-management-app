import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Column from '../Column';
import { RootState } from '../../../redux/store';
import { useEffect } from 'react';
import BoardHeader from '../components/header';
import { useParams } from 'react-router-dom';
import { getBoardByID } from '../../../redux/boards-reducer';
import BtnAddColumn from '../../../components/board/btn-addColumn';
import './index.scss';
import Header from '../../../components/header';
import Preloader from '../../../components/preloader';
import EditProfileButton from '../../../components/header/EditProfileButton';
import { LocaleSelect } from '../../../components/header/LocalesSelect';
import SignOutButton from '../../../components/header/SignOut';

const Board = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const params = useParams();
  const { id } = params;
  const { currentBoard, isFetch } = useAppSelector((state: RootState) => state.boards);
  const { columns } = useAppSelector((state: RootState) => state.boards.currentBoard);
  const dispatch = useAppDispatch();

  const setBoard = async () => {
    if (id && token) {
      await dispatch(getBoardByID({ token, id }));
    }
  };

  useEffect(() => {
    setBoard();
  }, [token]);

  return (
    <>
      <header className="header">
        <EditProfileButton />
        <SignOutButton />
        <LocaleSelect />
      </header>
      {isFetch ? (
        <Preloader />
      ) : (
        <div className="Board">
          <BoardHeader title={currentBoard.title} />
          <div className="board-columns-container">
            {columns && Object.keys(columns).length !== 0
              ? columns.map((el) => <Column column={el} key={el.id} />)
              : ''}
            <BtnAddColumn />
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
