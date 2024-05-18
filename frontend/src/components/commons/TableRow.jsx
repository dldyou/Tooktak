export function TableRow({header,item,select,id}) {
    return (
        <tr
            onClick={()=>{
                select(item[id]);
            }}
            className={item["selected"] ? "is-selected" : ""}>
            {header.map((h) => (
                <td key={h}>{item[h]?item[h]:"null"}</td>
            ))}
        </tr>
    );
}