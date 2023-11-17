import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import {Route, Routes} from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import {useState} from "react";
import Home from "./scenes/home";

function App() {
    const [theme, colorMode] = useMode();
    const [selectedItem, setSelectedItem] = useState("Home");
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Sidebar setSelectedItem={setSelectedItem}/>
                    <main className="content">
                        <Topbar selectedItem={selectedItem}/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;