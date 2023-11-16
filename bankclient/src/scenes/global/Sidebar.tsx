import React, {useState} from "react";
import {Avatar, Box, IconButton, MenuItem, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {HomeOutlined, MenuOutlined} from "@mui/icons-material";
import PixOutlinedIcon from '@mui/icons-material/PixOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

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
        <MenuItem component={Link} to={to} style={{display: "flex", alignItems: "center"}}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                {icon}
                <Typography style={{marginLeft: "5px", color: selected === title ? colors.red[400] : undefined}}
                            onClick={() => setSelected(title)}>
                    {title}
                </Typography>
            </Box>
        </MenuItem>
    );
};

const Sidebar: React.FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                backgroundColor: colors.purple[400]
            }}
        >
            {/* Header */}
            <MenuItem>
                {!isCollapsed && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
                    >
                        <Typography variant="h3" color={colors.white1[100]}>
                            Nubank
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOutlined/>
                        </IconButton>
                    </Box>
                )}
            </MenuItem>

            {/* User Info */}
            {!isCollapsed && (
                <Box sx={{display: "flex", alignItems: "center", paddingLeft: "5%", paddingTop:"5%"}}>
                    <Avatar sx={{bgcolor: colors.purple[200], marginRight: "5px"}}>CT</Avatar>
                    <Box>
                        <Typography>
                            Clara Torres
                        </Typography>
                        <Typography fontSize="9px">Agência 0001 • Conta 36332425-5</Typography>
                        <Typography fontSize="9px">Banco 0260 • Quantum Pagamentos S.A -</Typography>
                        <Typography fontSize="9px">Instituição de pagamentos</Typography>
                        {/* Adicione quantas Typography quiser aqui */}
                    </Box>
                </Box>
            )}

            {/* Menu Items */}
            <Box marginTop={5}>
                {/* Existing Items */}
                <Item
                    title="Início"
                    to="/"
                    icon={<HomeOutlined/>}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Área Pix"
                    to="/area-pix"
                    icon={<PixOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Transferência"
                    to="/transferencia"
                    icon={<CurrencyExchangeOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Depositar"
                    to="/depositar"
                    icon={<PaymentsOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Investimentos"
                    to="/investimentos"
                    icon={<SignalCellularAltOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />


            </Box>
            <Box sx={{
                bottom: 0,
                position: "fixed",
                width: "100%",
                textAlign: "center",
                marginBottom: 2
            }}>
                <Item
                    title="Sair"
                    to="/sair"
                    icon={<LogoutOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
            </Box>
        </Box>
    );
};

export default Sidebar;

