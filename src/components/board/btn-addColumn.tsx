import { useState } from 'react';

interface btnProps {
  btnOnclick?: (text: string) => void;
}

const BtnAddColumn = (props: btnProps) => {
  const [columnName, setColumnName] = useState('');
  //const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const onclickHandler = () => {
    props.btnOnclick!(columnName);

    setColumnName('');
  };
  return (
    <div className="addColumn">
      <input type="text" value={columnName} onChange={(ev) => setColumnName(ev.target.value)} />
      <button className="btn-addcol" onClick={onclickHandler}>
        add column
      </button>
    </div>
  );
};

export default BtnAddColumn;
