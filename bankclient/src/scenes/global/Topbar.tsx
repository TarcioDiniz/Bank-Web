import React from "react";
import {Avatar, Box, IconButton, Theme, Typography, useTheme} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

// Import ColorModeContext and tokens from your original code
import {tokens} from "../../theme";
import StringAvatar from "../../utilities/StringAvatar";
import {getAuthenticatedAccount} from "../../data/globals";


const Topbar: React.FC<{ selectedItem: string }> = ({ selectedItem }) => {
    const theme = useTheme() as Theme;
    const colors = tokens(theme.palette.mode);
    const name = getAuthenticatedAccount()?.fullName

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
                    <Avatar {...StringAvatar(name)} />
                    <Typography
                        style={{
                            fontFamily: "'Source Sans 3', 'sans-serif'",
                            fontWeight: "bold",
                        }}
                        fontSize={18}
                        marginLeft={1}
                        color={colors.black[900]}
                    >
                        {name !== null ? name : 'Loading...'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Topbar;
