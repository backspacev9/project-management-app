interface PropsBoardHeader {
  title: string;
}
const BoardHeader = (porps: PropsBoardHeader) => {
  const { title } = porps;
  const onChangeHandler = () => {};
  return (
    <div className="board-header">
      <input type="text" value={title || ''} onChange={(ev) => onChangeHandler} />
    </div>
  );
};

export default BoardHeader;
