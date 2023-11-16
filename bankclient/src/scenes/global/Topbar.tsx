import React, {useContext} from "react";
import {
    IconButton,
    InputBase,
    useTheme,
    Theme,
} from "@mui/material";
import {Box} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

// Import ColorModeContext and tokens from your original code
import {ColorModeContext, tokens} from "../../theme";

interface TopbarProps {
    // Add any additional props if needed
}

const Topbar: React.FC<TopbarProps> = () => {
    const theme = useTheme() as Theme; // Added 'as Theme' to inform TypeScript about the type
    const colorMode = useContext(ColorModeContext);

    const colors = tokens(theme.palette.mode);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            {...{ backgroundColor: colors.purple[400] as any }}
        >
            {/* SEARCH BAR */}
            <Box
                // Add type assertion here
                sx={{display: "flex", backgroundColor: colors.purple[300], borderRadius: "3px"}}
            >
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
                <IconButton type="button" sx={{p: 1}}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;