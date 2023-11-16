import React from "react";
import {Avatar, Box, IconButton, Theme, Typography, useTheme} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

// Import ColorModeContext and tokens from your original code
import {tokens} from "../../theme";

const stringAvatar = (name: string | undefined): { children: string } => {
    if (!name) {
        return {
            children: 'NA', // Use any default text or icon for undefined names
        };
    }

    const initials = name
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase())
        .join('');

    return {
        children: initials, // Use first letters of first and last names
    };
};


interface TopbarProps {
    // Add any additional props if needed
}

const Topbar: React.FC<{ selectedItem: string }> = ({ selectedItem }) => {
    const theme = useTheme() as Theme;
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            {...{backgroundColor: colors.white2[100] as any}}
        >
            {/* SEARCH BAR */}
            <Box marginLeft={4}>
                <Typography
                    style={{
                        fontFamily: "'Source Sans 3', 'sans-serif'",
                        fontWeight: "bold",
                    }}
                    fontSize={23}
                    marginTop={1}
                    color={colors.black[900]}
                >
                    {selectedItem}
                </Typography>
            </Box>

            {/* ICONS */}
            <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                    <IconButton>
                        <NotificationsOutlinedIcon style={{color: "black"}}/>
                    </IconButton>
                </Box>
                <Box display="flex" alignItems="center" marginRight={2}>
                    <Avatar {...stringAvatar('Tarcio Diniz')} />
                    <Typography
                        style={{
                            fontFamily: "'Source Sans 3', 'sans-serif'",
                            fontWeight: "bold",
                        }}
                        fontSize={18}
                        marginLeft={1}
                        color={colors.black[900]}
                    >
                        Tarcio Diniz
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Topbar;
