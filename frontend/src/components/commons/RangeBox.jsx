export default function RangeBox({label, setStart, setEnd, start, end, placeholder1, placeholder2}) {
    
    return (<div className={"box"}>
        <div className="level">
            <div className="level-left">
                <label className="label">{label}</label>
            </div>
            <div className="field has-addons is-primary is-outlined is-fullwidth">
                <input className="input"
                       type="number"
                       value={start}
                       placeholder={placeholder1}
                       onChange={(e) => {
                           setStart(e.target.value)
                       }}/>
                <div className={"block"}>
                    <p className={"is-size-4"}> ~ </p>
                </div>
                <input className="input" type="number" value={end} 
                       placeholder={placeholder2}
                       onChange={(e) => {
                           setEnd(e.target.value)
                       }}/>
                
            </div>
        </div>
    </div>);
}