import { useTranslation } from 'react-i18next';
import { handleVisibleModal, setModalAction } from '../../redux/app-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { modalActionEnum } from '../../utils/enums';

const BtnAddColumn = () => {
  // const [columnName, setColumnName] = useState('');
  //const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  // const onclickHandler = () => {
  //   props.btnOnclick!(columnName);

  //   setColumnName('');
  // };

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleOnClick = () => {
    dispatch(setModalAction(modalActionEnum.createColumn));
    dispatch(handleVisibleModal(true));
  };

  return (
    <div className="addColumn">
      {/* <input type="text" value={columnName} onChange={(ev) => setColumnName(ev.target.value)} />
      <button className="btn-addcol" onClick={onclickHandler}>
        add column
      </button> */}
      <button className="btn-addcol" onClick={handleOnClick}>
        {t('column.create_btn')}
      </button>
    </div>
  );
};

export default BtnAddColumn;
