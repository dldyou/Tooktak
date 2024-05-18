import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/SearchPage";
import Admin from "./pages/AdminPage";
import Login from "./pages/LoginPage";
import Root from "./pages/Root";
import Upload from "./pages/UploadPage";
import LogPage from "./pages/LogPage";
import { RefreshTokenProvider } from "./services/config/tokenRefresher";
import { AuthProvider } from "./contexts/AuthContext";

const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RefreshTokenProvider>
                    <Routes>
                        <Route path="/" element={<Root />}>
                            <Route path="login" element={<Login />} />
                            <Route path="search" element={<Search />} />
                            <Route path="upload" element={<Upload />} />
                            <Route path="account" element={<Admin />} />
                            <Route path="log" element={<LogPage />} />
                        </Route>
                    </Routes>
                </RefreshTokenProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};




export default Router;