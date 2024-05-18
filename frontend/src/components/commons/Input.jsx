
export function Input({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            className="input  is-large is-rounded"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export function IdInputField({ label, value, onChange, type, placeholder, className }) {
    return (
        <div className="field">
            <label className="label"></label>
            <div className="control has-icons-left">
                <Input value={value} onChange={onChange} type={type} placeholder={placeholder} className={className} />
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </div>
    );
}
export function PwInputField({ label, value, onChange, type, placeholder, className }) {
    return (
        <div className="field">
            <label className="label"></label>
            <div className="control has-icons-left">
                <Input value={value} onChange={onChange} type={type} placeholder={placeholder} className={className} />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </div>
        </div>
    );
}