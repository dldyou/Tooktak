import { LargeSection } from "../components/commons/Section";
import { Card } from "../components/commons/Card";
import { Button } from "../components/commons/Button";
import UploadBox from "../components/service/upload/UploadBox";
import { UploadFileProvider } from "../contexts/UploadFileContext";

export default function Upload() {
    return (
        <UploadFileProvider>
            <LargeSection>
                <Card header={"데이터 업로드"}
                    body={<UploadBox />}
                    footer={<Button children={"upload"} />} />
            </LargeSection>
        </UploadFileProvider>
    );
}
