import { LargeSection } from "../components/commons/Section";
import { Card } from "../components/commons/Card";
import { Table } from "../components/commons/Table";
import { Button } from "../components/commons/Button";
export default function Admin() {
    return (
        <LargeSection>
            <Card header={"사용자 계정"}
                body={
                    <Table
                        header={["이름", "id", "pw", "소속"]}
                        items={[
                            ["문찬규", "djawnstlr1422", "ds", "개발자"],
                            ["김민수", "minsu", "1234", "분석가"],
                            ["엄준식", "junsic123", "1234", "개발자"],
                        ]}
                    />
                }
                footer={
                    <>
                        <Button children={"계정 추가"} color={"green"} />
                        <Button children={"계정 삭제"} color={"red"} />
                    </>}
            />

        </LargeSection>
    );
}
