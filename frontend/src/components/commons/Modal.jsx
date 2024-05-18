
export default function Modal({body, title, onClose, active, setActive}) {
    return <div className={`modal ${active && "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                <button className="delete" aria-label="close" onClick={() => {
                    onClose();
                    setActive(false);
                }
                }></button>
            </header>
            <section className="modal-card-body">
                {body}
            </section>
            <footer className="modal-card-foot">
                <div className="buttons">
                    <button className="button is-danger" onClick={()=>{
                        onClose();
                        setActive(false);
                    }}>Cancel</button>
                </div>
            </footer>
        </div>
    </div>

}