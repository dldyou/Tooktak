import React from 'react';

export function LTableRow({ header, item, select, id }) {
    console.log("LTableRow item:", item); // 디버깅을 위한 콘솔 로그 추가

    return (
        <tr>
            {header.map((key, index) => (
                <td key={index}>{item[index]}</td>
            ))}
        </tr>
    );
}
