import { Menu, MenuItem, MenuLabel, MenuList } from "../commons/Menu";
import logo from "../../../src/asset/logo.png";
import { useLogout, useMode } from "../../contexts/AuthContext";

export default function Navigation() {
    const mode = useMode();
    const logout = useLogout();

    return (<Menu logo={logo}>
        <MenuLabel label={"계정"} />
        <MenuList>
            {mode ? (<MenuItem path="/login" name="로그아웃" onClick={logout} />) : (
                <MenuItem path={"/login"} name="로그인" />)}
        </MenuList>
        <MenuLabel label={"데이터 관리"} />
        <MenuList>
            <MenuItem path={"/search"} name={"데이터 검색"} />
            <MenuItem path={"/upload"} name={"데이터 업로드"} />
        </MenuList>
        {mode === "admin" ? <>
            <MenuLabel label={"관리자 메뉴"} />
            <MenuList>
                <MenuItem path={"/account"} name={"계정 관리"} />
                <MenuItem path={"/log"} name={"로그 확인"} />
            </MenuList>
        </> : null}
    </Menu>);
}
