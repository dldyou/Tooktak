import { IdInputField, PwInputField } from "../commons/Input";
import { LoginButton } from "../commons/Button";
import { useState } from "react";
import { useLogin } from "../../contexts/AuthContext";
import LoginLayout from "../layout/LoginLayout";

export function LoginBox() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();

    return (
        <LoginLayout>
            <IdInputField
                label="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력하세요."
            />
            <PwInputField
                label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요."
            />
            <LoginButton onClick={(e) => {
                e.preventDefault();
                login(id, password);
            }} children={"login"} />
        </LoginLayout>
    );
}
