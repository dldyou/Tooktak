export function Card({ body, header, footer }) {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{header}</p>
      </header>
      <div className="card-content">
        <div className="content">{body}</div>
      </div>
        <div className="level">
            <div className="level-left">
            </div>
            <div className="level-right">
                <footer className="card-footer">{footer}</footer>
            </div>
        </div>
    </div>
  );
}
