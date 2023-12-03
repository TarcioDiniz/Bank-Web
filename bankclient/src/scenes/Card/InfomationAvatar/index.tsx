import React from 'react';
import { Avatar, Box, Button, Typography } from "@mui/material";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from 'axios';
import {getAuthenticatedAccount} from "../../../data/globals";

const InformationAvatar = () => {

    const handleClick = async () => {
        try {
            // Substitua 'SEU_ENDPOINT' pelo seu endpoint real
            const response = await axios.get('http://localhost:8080/api/transactions/statement/' + getAuthenticatedAccount()?.id, {
                responseType: 'blob', // Indica que a resposta é um blob (binary data)
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Abre o PDF em uma nova guia do navegador
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Erro ao obter o PDF:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="row" justifyContent="center">
            {/* Botão 1 */}
            <Button
                style={{
                    marginTop: 0,
                    marginRight: 50,
                    margin: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                onClick={handleClick}
            >
                <Avatar sx={{ width: 70, height: 70, background: "white" }}>
                    <DescriptionOutlinedIcon style={{ color: "black" }} sx={{ width: 35, height: 35 }} />
                </Avatar>
                <Typography sx={{ fontSize: "11px", color: "white" }} marginTop={1}>Request</Typography>
                <Typography sx={{ fontSize: "11px", color: "white" }}>Extract</Typography>
            </Button>
        </Box>
    );
}

export default InformationAvatar;
