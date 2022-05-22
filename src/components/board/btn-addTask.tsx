import { useState } from 'react';

interface btnProps {
  btnOnclick?: (text: string) => void;
}

const BtnAddTask = (props: btnProps) => {
  const [taskText, setTaskText] = useState('');
  //const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const onclickHandler = () => {
    props.btnOnclick!(taskText);

    setTaskText('');
  };
  return (
    <div className="addTask">
      <textarea value={taskText} onChange={(ev) => setTaskText(ev.target.value)} />

      <button className="btn-addTaskCard" onClick={onclickHandler}>
        add task card
      </button>
    </div>
  );
};

export default BtnAddTask;
