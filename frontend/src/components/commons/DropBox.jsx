import {useState} from "react";

export function DropBox({label, options, value, setValue}) {
    const [active, setActive] = useState(false);
    return (<div className={"box is-primary "}>
        <div className={"level"}>
            <div className={"level-left"}>
                <label className="label">{label}</label>
            </div>
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
                        <span>{value || "      "}</span>
                        <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {options.map((option) => (
                            <a key={option} className="dropdown-item" onClick={() => {
                                setValue(option)
                                setActive(false)
                            }}>
                                {option}
                            </a>))}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
