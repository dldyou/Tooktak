export function DirectoryInputBox({color, label, accept, onChange}) {
    const c = {
        green: "is-primary",
        yellow: "is-warning",
        red: "is-danger",
        blue: "is-info"
    };

    return (
        <div className={`file has-name is-boxed ${c[color]}`}>
            <label className="file-label">
                <input
                    className="file-input"
                    type="file"
                    name="resume"
                    webkitdirectory=""
                    accept={accept}
                    onChange={onChange}
                />
                <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">
                        {label}
                    </span>
                </span>
                <span className="file-name">
                </span>
            </label>
        </div>
    );
}