import { useTranslation } from 'react-i18next';
import { setModalAction } from '../../redux/app-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { modalActionEnum } from '../../utils/enums';

const BtnAddColumn = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleOnClick = () => {
    dispatch(setModalAction(modalActionEnum.createColumn));
  };

  return (
    <div className="addColumn">
      <button className="btn-addcol" onClick={handleOnClick}>
        {t('column.create_btn')}
      </button>
    </div>
  );
};

export default BtnAddColumn;
