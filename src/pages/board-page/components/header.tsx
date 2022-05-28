interface PropsBoardHeader {
  title: string;
}
const BoardHeader = (porps: PropsBoardHeader) => {
  const { title } = porps;
  return <h3 className="board-header">{title}</h3>;
};

export default BoardHeader;
