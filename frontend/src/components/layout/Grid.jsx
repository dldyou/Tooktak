
export function Grid({children,min=12}){
    return <div className={`grid is-col-min-${min}`}>{children}</div>
}