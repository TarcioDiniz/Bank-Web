import React from "react";
import {Avatar, Box, MenuItem, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {HomeOutlined} from "@mui/icons-material";
import PixOutlinedIcon from '@mui/icons-material/PixOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {clearAuthenticatedAccount} from "../../data/globals";

interface ItemProps {
    title: string;
    to: string;
    icon: React.ReactNode;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: React.FC<ItemProps> = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            component={Link}
            to={to}
            style={{
                display: "flex",
                alignItems: "center",
                padding: 13
            }}
            sx={[{'&:hover': {backgroundColor: `${colors.purple[100]}`}}]}
            onClick={() => setSelected(title)}
        >
            <Box sx={{display: "flex", alignItems: "center"}} marginLeft={3}>
                {icon}
                <Typography
                    style={{
                        marginLeft: "5px",
                        color: selected === title ? "black" : colors.white2[600],
                        fontWeight: selected === title ? "bold" : undefined,
                    }}>
                    {title}
                </Typography>
            </Box>
        </MenuItem>
    );
};

const Sidebar: React.FC<{ setSelectedItem: React.Dispatch<React.SetStateAction<string>> }> = ({setSelectedItem}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = React.useState("Dashboard");
    const [loggedOut, setLoggedOut] = React.useState(false); // New state to handle logout

    const handleLogout = () => {
        // Perform any logout logic here
        // For now, just clear the authentication status in localStorage
        localStorage.removeItem("authenticated");
        setLoggedOut(true);
        clearAuthenticatedAccount()
        window.location.reload();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: colors.white1[100],
                width: "280px",
                height: '100vh'
            }}
        >
            <div>
                {/* User Info */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingLeft={5}
                    paddingTop={3}
                >
                    <Typography variant="h4" color={colors.black[900]}>
                        Plutus
                    </Typography>

                </Box>

                {/* Menu Items */}
                <Box marginTop={5}>
                    {/* Existing Items */}
                    <Item
                        title="Home"
                        to="/Home"
                        icon={<HomeOutlined style={{color: selected === 'Home' ? 'black' : colors.white2[600]}}/>}
                        selected={selected}
                        setSelected={(title) => {
                            setSelected(title);
                            setSelectedItem(title); // Adiciona essa linha para atualizar o item selecionado na Topbar
                        }}
                    />
                    <Item
                        title="Pix"
                        to="/pix"
                        icon={<PixOutlinedIcon style={{color: selected === 'Pix' ? 'black' : colors.white2[600]}}/>}
                        selected={selected}
                        setSelected={(title) => {
                            setSelected(title);
                            setSelectedItem(title); // Adiciona essa linha para atualizar o item selecionado na Topbar
                        }}
                    />
                    {/*<Item
                        title="Transfer"
                        to="/transfer"
                        icon={<CurrencyExchangeOutlinedIcon
                            style={{color: selected === 'Transfer' ? 'black' : colors.white2[600]}}/>}
                        selected={selected}
                        setSelected={(title) => {
                            setSelected(title);
                            setSelectedItem(title); // Adiciona essa linha para atualizar o item selecionado na Topbar
                        }}
                    />*/}
                    <Item
                        title="Deposit"
                        to="/deposit"
                        icon={<PaymentsOutlinedIcon
                            style={{color: selected === 'Deposit' ? 'black' : colors.white2[600]}}/>}
                        selected={selected}
                        setSelected={(title) => {
                            setSelected(title);
                            setSelectedItem(title); // Adiciona essa linha para atualizar o item selecionado na Topbar
                        }}
                    />
                    {/*<Item
                        title="Investments"
                        to="/investments"
                        icon={<SignalCellularAltOutlinedIcon
                            style={{color: selected === 'Investments' ? 'black' : colors.white2[600]}}/>}
                        selected={selected}
                        setSelected={(title) => {
                            setSelected(title);
                            setSelectedItem(title); // Adiciona essa linha para atualizar o item selecionado na Topbar
                        }}
                    />*/}
                    {/* ... (other items) */}
                </Box>
            </div>
            <Box>
                <Item
                    title="Settings"
                    to="/Settings"
                    icon={<SettingsOutlinedIcon
                        style={{color: selected === 'Settings' ? 'black' : colors.white2[600]}}/>}
                    selected={selected}
                    setSelected={(title) => {
                        setSelected(title);
                        setSelectedItem(title); // Adiciona essa linha para atualizar o item selecionado na Topbar
                    }}
                />
                <Item
                    title="Logout"
                    to="/"
                    icon={<LogoutOutlinedIcon style={{ color: selected === 'Logout' ? 'black' : colors.white2[600] }} />}
                    selected={selected}
                    setSelected={() => handleLogout()}
                />
            </Box>
        </Box>
    );
};

export default Sidebar;
