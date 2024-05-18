import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../components/service/Navigation";
import { useEffect, useState } from "react";
import { useMode } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";

export default function Root() {
    const mode = useMode();
    const [hideLeft, setHideLeft] = useState(false);
    const toggleHideLeft = () => setHideLeft(!hideLeft);
    const navigation = useNavigate()
    useEffect(() => {
        if (mode === null) {
            navigation("/login");
        }
    }, []);
    return <Layout left={<Navigation />}
        hideLeft={mode === null || hideLeft}
        toggleHideLeft={toggleHideLeft}
        right={<Outlet />}
        ratio={[3, 9]}
    />
}