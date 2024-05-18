import {
    useAttributeDispatch,
    useMetadata,
} from "../../../../contexts/MetadataContext";
import {Grid} from "../../../layout/Grid";
import {TextBox} from "../../../commons/TextBox";
import RangeBox from "../../../commons/RangeBox";
import {DropBox} from "../../../commons/DropBox";


export default function AttributeList() {
    const {hospital,attributes} = useMetadata();
    const { setText, setRange, setCheckbox } = useAttributeDispatch();
    return <Grid>
        {attributes.map((attribute) => {
            switch (attribute.option) {
                case "text":
                    return <TextBox
                        key={hospital + attribute.name}
                        label={attribute.name}
                        placeholder={attribute.type}
                        setValue={(value) => setText(attribute.name, value)}
                        value={attribute.value}
                    />
                case "checkbox":
                    return <DropBox
                        key={hospital + attribute.name}
                        label={attribute.name}
                        options={attribute.list}
                        setValue={(value) => setCheckbox(attribute.name, value)}
                        value={attribute.value}
                    />
                case "range":
                    return <RangeBox
                        key={hospital + attribute.name}
                        label={attribute.name}
                        setStart={(start) => setRange(attribute.name, start, attribute.end)}
                        setEnd={(end) => setRange(attribute.name, attribute.start, end)}
                        start={attribute.start}
                        end={attribute.end}
                    />
                default:
                    return null;
            }
        })}
    </Grid>
}