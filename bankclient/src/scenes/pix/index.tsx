import React, {useState} from "react";
import {Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme,} from "@mui/material";
import {tokens} from "../../theme";
import PixKey from "../Card/PixKey";
import BalanceCard from "../Card/BalanceCard";
import QuickTransfer from "../Card/QuickTransfer";
import MoneyInput from "../Card/MoneyInput";
import DateInput from "../Card/DateInput";

const Pix: React.FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pixKey, setPixKey] = useState('');


    const handleFormatChange = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: 'emailCpfCnpj'
    ) => {
        let data = (event.target as HTMLInputElement).value;

        // Remover todos os pontos, traços e barras antes de verificar o tipo
        const cleanedData = data.replace(/[.\-/]/g, '');

        let detectedType: 'email' | 'cpf' | 'cnpj' = 'email';

        if (/^\S+@\S+\.\S+$/.test(cleanedData)) {
            detectedType = 'email';
        } else if (/^\d{11}$/.test(cleanedData)) {
            detectedType = 'cpf';
        } else if (/^\d{14}$/.test(cleanedData)) {
            detectedType = 'cnpj';
        }

        if (detectedType === 'email') {
            // Se for e-mail, não adicionamos pontuação
            data = cleanedData.toLowerCase();
        } else if (detectedType === 'cpf') {
            // Se for CPF, adicionamos a pontuação
            data = `${cleanedData.substr(0, 3)}.${cleanedData.substr(3, 3)}.${cleanedData.substr(6, 3)}-${cleanedData.substr(9, 2)}`;
        } else if (detectedType === 'cnpj') {
            // Se for CNPJ, adicionamos a pontuação
            data = `${cleanedData.substr(0, 2)}.${cleanedData.substr(2, 3)}.${cleanedData.substr(5, 3)}/${cleanedData.substr(8, 4)}-${cleanedData.substr(12)}`;
        }

        setPixKey(data);
    };

    return (
        <Grid container spacing={2}>
            {/* Lado Esquerdo: Chaves Pix */}
            <Grid item xs={6} sx={{marginLeft: 3}}>
                <Card sx={{marginBottom: 2, backgroundColor: "#aecec9"}}>
                    <PixKey/>
                </Card>
                <Card
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "220px",
                        backgroundColor: "#012030",
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{width: "90%", height: "90%"}}>
                        {/* Typography fixed at the top */}
                        <Typography
                            variant="h6"
                            color={colors.white2[100]}
                            style={{fontWeight: "bold"}}
                        >
                            Quick Transfer
                        </Typography>
                        <QuickTransfer/>
                    </Box>
                </Card>
            </Grid>

            {/* Lado Direito: Saldo e Formulário de Transferência */}
            <Grid item xs={5.6} sx={{marginRight: 1}}>
                <Card sx={{marginBottom: 2, backgroundColor: "#c2e5c5"}}>
                    <CardContent>
                        <BalanceCard/>
                    </CardContent>
                </Card>

                {/* Formulário de Transferência */}
                <Card sx={{height: 480, backgroundColor: colors.blue[300]}}>
                    <CardContent>
                        <Typography marginBottom={2} color={colors.black[700]} fontWeight="bold" variant="h4">Transfer</Typography>
                        <TextField label="Description" variant="outlined" fullWidth margin="normal"/>
                        <DateInput/>
                        <MoneyInput/>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Pix key"
                            fullWidth
                            value={pixKey}
                            onInput={(e) => handleFormatChange(e as React.FormEvent<HTMLInputElement>, 'emailCpfCnpj')}
                        />
                        {/* Botão para realizar a transferência */}
                        <Button sx={{marginTop: 4}} variant="contained" color="primary" fullWidth={true}>
                            transfer
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Pix;
