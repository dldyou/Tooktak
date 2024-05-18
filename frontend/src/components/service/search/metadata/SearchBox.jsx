import { SmallSection } from "../../../commons/Section";
import { Card } from "../../../commons/Card";
import Hospital from "./Hospital";
import AttributeList from "./AttributeList";
import SearchButtons from "./SearchButtons";
import { MetadataProvider } from "../../../../contexts/MetadataContext";


export default function SearchBox() {
    return (
        <SmallSection>
            <MetadataProvider>
                <Card
                    header={<Hospital />}
                    body={<AttributeList />}
                    footer={<SearchButtons />}
                />
            </MetadataProvider>
        </SmallSection>
    );
}

