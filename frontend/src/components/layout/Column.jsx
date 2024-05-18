export function Columns({ children, isGapless }) {
  return <div className={`columns is-fullheight ${isGapless && "is-gapless"}`}>{children}</div>;
}
export function Column({ children, ratio }) {
  return <div className={`column is-${ratio}`}>{children}</div>;
}
