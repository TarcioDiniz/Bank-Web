import React, {useState} from "react";
import {Box, Button, Card, CardContent, Grid, TextField, Typography, useTheme,} from "@mui/material";
import {tokens} from "../../theme";
import PixKey from "../Card/PixKey";
import BalanceCard from "../Card/BalanceCard";
import QuickTransfer from "../Card/QuickTransfer";
import MoneyInput from "../Card/MoneyInput";
import DateInput from "../Card/DateInput";
import {useAlert} from "../Card/AlertContextProps";
import {getAuthenticatedAccount} from "../../data/globals";

const Pix: React.FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pixKey, setPixKey] = useState('');
    const [description, setDescription] = useState('');
    const [transferAmount, setTransferAmount] = useState<string>('');
    const { showAlert } = useAlert();

    const handleTransfer = async () => {
        try {
            // Construa o objeto JSON com os dados do formulário
            const transferData = {
                accountId: getAuthenticatedAccount()?.id, // Substitua pelo valor real
                transactionName: description,
                pixKey: pixKey,
                transferAmount: parseFloat(transferAmount) || 0,
            };

            // Envie a requisição POST para a rota desejada
            const response = await fetch('http://localhost:8080/V1/bank/pix/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transferData),
            });

            // Verifique se a resposta é bem-sucedida (status 200)
            if (response.status === 200) {
                // Limpe os dados do formulário
                setPixKey('');
                setTransferAmount('');

                // Exiba um alerta de sucesso
                showAlert('Transferência realizada com sucesso!', 'success');
            } else {
                // Se a resposta não for bem-sucedida, exiba um alerta de erro
                showAlert('Erro ao realizar a transferência. Tente novamente mais tarde.', 'error');
            }
        } catch (error) {
            // Em caso de erro durante a requisição, exiba um alerta de erro
            showAlert('Erro ao realizar a transferência. Tente novamente mais tarde.', 'error');
        }
    };

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

    const handleMoneyInputChange = (value: string) => {
        setTransferAmount(value);
    };

    const handleDescriptionInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const value = (event.target as HTMLInputElement).value;
        setDescription(value);
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
                        <BalanceCard/>;
                    </CardContent>
                </Card>

                {/* Formulário de Transferência */}
                <Card sx={{height: 480, backgroundColor: colors.blue[300]}}>
                    <CardContent>
                        <Typography marginBottom={2} color={colors.black[700]} fontWeight="bold"
                                    variant="h4">Transfer</Typography>
                        <TextField onChange={handleDescriptionInputChange} label="Description" variant="outlined" fullWidth margin="normal"/>
                        <DateInput/>
                        <MoneyInput value={transferAmount} onChange={handleMoneyInputChange}/>
                        <TextField
                            margin="dense"
                            label="Pix key"
                            fullWidth
                            value={pixKey}
                            onInput={(e) => handleFormatChange(e as React.FormEvent<HTMLInputElement>, 'emailCpfCnpj')}
                        />
                        {/* Botão para realizar a transferência */}
                        <Button
                            sx={{marginTop: 4}}
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            onClick={handleTransfer}  // Adicione este onClick para chamar a função ao clicar no botão
                        >
                            Transfer
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Pix;
