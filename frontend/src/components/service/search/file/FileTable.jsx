import {Table} from "../../../commons/Table";
import {useFileAttribute, useFileList, useSelectFile,} from "../../../../contexts/FileContext";
import {Button} from "../../../commons/Button";
import FileInput from "../../../commons/FileInput";

export function FileTable() {
    const items = useFileList();
    const attributes = useFileAttribute();
    const {select, selectAll, unselectAll} = useSelectFile();
    return <>
        {items.length > 0 ? <>
            <FileInput label={"export to excel"}/>
            <Button children={"모두 선택"} onClick={selectAll} color={"blue"}/>
            <Button children={"모두 해제"} onClick={unselectAll} color={"red"}/>
        </> : null
        }
        <Table header={attributes}
               items={items}
               select={select}
               id={"file_id"}
        />
    </>;
}