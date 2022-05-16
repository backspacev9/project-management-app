import { useState } from 'react';

interface InputTittleInteface {
  tittle: string;
  onChange?: () => void;
}
const InputTittle = (props: InputTittleInteface) => {
  //const { tittle } = useAppSelector((store) => store.boardSlice);
  const [isActive, setIsActive] = useState(false);

  const handleOnChange = () => {};

  return <input type="text" value={props.tittle} onChange={(ev) => props.onChange} />;
};

export default InputTittle;
