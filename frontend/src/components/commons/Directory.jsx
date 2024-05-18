import {useState} from "react";

export function Directory({directory, path}) {
    const color = {
        xlsxOnly: "is-dark",
        fileOnly: "is-warning",
        ready: "is-primary",
        error: "is-danger",
        success: "is-link"
    }
    const [active, setActive] = useState(false);
    return <div className={`message ${color[directory.state]}`}
                onClick={() => setActive(!active)}
    >
        <div className="message-header">
            <p>{path}</p>
        </div>
        <div className="message-body">
            {Object.keys(directory.files).length>0 ?Object.entries(directory.files).map(([key, value]) =>
                <div key={key} className="box">
                    <p>{directory.state === "fileOnly" ? key + value.name : value.name}</p>
                </div>
            ):<div className="box">xlsx data only</div>}
            {active && directory.state !== "fileOnly" &&
                <div className="box">{Object.entries(directory.attributes).map(([key, val]) => key + ": " + val).join(", ")}</div>}
        </div>
    </div>
}
