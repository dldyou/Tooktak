import {useState} from "react";

export function FileDropBox({ files, dirPath}) {
    const [active, setActive] = useState(false);
    return (
            <div className={`dropdown ${active && "is-active"}`}>
                <div className="dropdown-trigger">
                    <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        onClick={() => {
                            setActive(!active)
                        }}
                    >
                        <span>{dirPath}</span>
                        <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {files && files.map((file) => (
                            <a key={file.name} className="dropdown-item">
                                {dirPath==="untracked"?file.webkitRelativePath :file.name}
                            </a>))}
                    </div>
                </div>
    </div>);
}
