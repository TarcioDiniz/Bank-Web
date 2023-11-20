import React, {useState} from 'react';
import {Avatar, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const InformationAvatar = () => {
    const [openDialog1, setOpenDialog1] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);

    const handleOpenDialog1 = () => {
        setOpenDialog1(true);
    };

    const handleCloseDialog1 = () => {
        setOpenDialog1(false);
    };

    const handleOpenDialog2 = () => {
        setOpenDialog2(true);
    };

    const handleCloseDialog2 = () => {
        setOpenDialog2(false);
    };

    return (
        <Box display="flex" flexDirection="row" justifyContent="center">
            {/* Botão 1 */}
            <Button onClick={handleOpenDialog1}
                    style={{
                        marginTop: 0,
                        marginRight: 50,
                        margin: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                <Avatar sx={{width: 70, height: 70, background: "white"}}><DescriptionOutlinedIcon style={{ color: "black" }} sx={{width: 35, height: 35}}/></Avatar>
                <Typography sx={{fontSize: "11px", color: "white"}} marginTop={1}>Request</Typography>
                <Typography sx={{fontSize: "11px", color: "white"}}>Extract</Typography>
            </Button>

            {/* Botão 2 */}
            <Button onClick={handleOpenDialog2}
                    style={{
                        marginTop: -20,
                        margin: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                <Avatar sx={{width: 70, height: 70, background: "white"}}><RequestQuoteOutlinedIcon style={{ color: "black" }} sx={{width: 35, height: 35}}/></Avatar>
                <Typography sx={{fontSize: "11px", color: "white"}} marginTop={1}>Charge</Typography>
            </Button>

            {/* Dialog 1 */}
            <Dialog open={openDialog1} onClose={handleCloseDialog1}>
                <DialogTitle>Dialog 1</DialogTitle>
                <DialogContent>
                    {/* Conteúdo do Dialog 1 */}
                    <Typography>Conteúdo do Dialog 1</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog1}>Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog 2 */}
            <Dialog open={openDialog2} onClose={handleCloseDialog2}>
                <DialogTitle>Dialog 2</DialogTitle>
                <DialogContent>
                    {/* Conteúdo do Dialog 2 */}
                    <Typography>Conteúdo do Dialog 2</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog2}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default InformationAvatar;
