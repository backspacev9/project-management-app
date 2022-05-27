interface PropsBoardHeader {
  title: string;
}
const BoardHeader = (porps: PropsBoardHeader) => {
  const { title } = porps;
  return (
    <div className="board-header">
      <h3>{title}</h3>
    </div>
  );
};

export default BoardHeader;
