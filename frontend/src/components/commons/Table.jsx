import { TableRow } from "./TableRow";

export function Table({ header, items, select, id }) {
    return (
        <div className={"table__wrapper"}>
            <table className="table">
                <thead>
                    <tr>
                        {header.map((headerTitle) => (
                            <th key={headerTitle}>{headerTitle}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        return <TableRow id={id} select={select} key={item.file_id} header={header} item={item} />
                    })}
                </tbody>
            </table>
        </div>
    );
}
