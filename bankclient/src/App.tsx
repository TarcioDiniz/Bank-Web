import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Home from "./scenes/home";
import Pix from "./scenes/pix";
import Deposit from "./scenes/deposit";
import Settings from "./scenes/settings";
import AuthComponent from "./scenes/AuthComponent";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";


function App() {
    const [theme, colorMode] = useMode();
    const [selectedItem, setSelectedItem] = useState("Home");
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem("authenticated") === "true"
    );

    const authenticateUser = () => {
        setAuthenticated(true);
        localStorage.setItem("authenticated", "true");
    };

    useEffect(() => {
        if (authenticated) {
            setSelectedItem("Home");
        }
    }, [authenticated]);

    if (!authenticated) {
        return <AuthComponent authenticateUser={authenticateUser} />;
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {/* Sidebar component */}
                    <Sidebar setSelectedItem={setSelectedItem} />

                    <main className="content">
                        {/* Topbar component */}
                        <Topbar selectedItem={selectedItem} />

                        {/* Routes */}
                        <Routes>
                            <Route path="/Home" element={<Home />} />
                            <Route path="/pix" element={<Pix />} />
                            <Route path="/deposit" element={<Deposit />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route
                                path="/*"
                                element={<Navigate to="/Home" replace />}
                            />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;