// Deposit.tsx
import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import {useAlert} from '../Card/AlertContextProps';
import MoneyInput from '../Card/MoneyInput';
import {tokens} from "../../theme";
import DateInput from "../Card/DateInput";
import BalanceCard from "../Card/BalanceCard";
import {getAuthenticatedAccount} from "../../data/globals";

interface Bank {
    identifier: string;
    name: string;
}

const banks: Bank[] = [
    {
        identifier: 'Banco Plutus - 2979',
        name: 'Banco A',
    },
    {
        identifier: 'Banco B - 4321',
        name: 'Banco B',
    },
    // Add other banks as needed
];

const initialBalance = Number(localStorage.getItem("data.amount"));

const Deposit: React.FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { showAlert } = useAlert();
    const [bank, setBank] = useState<string>('');
    const [account, setAccount] = useState<string>('');

    const [description, setDescription] = useState<string>('');
    const [value, setValue] = useState<string>(''); // Changed to string for MoneyInput
    const [userBalance, setUserBalance] = useState<number>(initialBalance);

    const handleDeposit = async () => {



        const depositValue = Number(value);


        const pixData = {
            accountId: getAuthenticatedAccount()?.id, // Substitua pelo valor real
            description: description,
            amount: value

        };

        // Envie a requisição POST para a rota desejada
        const response = await fetch('http://localhost:8080/V1/bank/addDeposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pixData),
        });

        // Verifique se a resposta é bem-sucedida (status 200)
        if (response.status === 200) {
            // Limpe os dados do formulário
            setValue('');
            setDescription("");

            // Exiba um alerta de sucesso
            showAlert('Deposit made successfully!', 'success');

        } else {
            // Se a resposta não for bem-sucedida, exiba um alerta de erro
            showAlert('Error when making the deposit. Try again later.', 'error');
        }

        // Implement the logic for processing the deposit using the bank and other details


    };



    const handleMoneyInputChange = (inputValue: string) => {
        setValue(inputValue);
    };

    return (
        <Grid sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Box width="98%">
                <Card sx={{marginBottom: 2, backgroundColor: "#c2e5c5"}}>
                    <CardContent>
                        <BalanceCard />;
                    </CardContent>
                </Card>
                <Card sx={{height: 500, backgroundColor: colors.blue[300]}}>
                    <CardContent>
                        <Typography marginBottom={2} color={colors.black[700]} fontWeight="bold" variant="h4">Deposit</Typography>
                        <FormControl disabled sx={{marginBottom: 2}} fullWidth>
                            <InputLabel>Banco</InputLabel>
                            <Select
                                value={"Banco Plutus - 2979"}
                                onChange={(e) => setBank(e.target.value as string)}
                            >
                                {banks.map((bank) => (
                                    <MenuItem key={bank.identifier} value={bank.identifier}>
                                        {bank.identifier}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            sx={{marginBottom: 2}}
                            label="Conta"
                            fullWidth
                            value={getAuthenticatedAccount()?.bankAccount}
                            onChange={(e) => setAccount(e.target.value)}
                            disabled
                        />

                        <Box sx={{marginBottom: 2}}><DateInput /></Box>

                        <TextField
                            sx={{marginBottom: 2}}
                            label="Descrição"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Box sx={{marginTop: -1}}>
                            <MoneyInput value={value} onChange={handleMoneyInputChange} />
                        </Box>

                        <Button sx={{marginTop: 2}} variant="contained" color="primary" fullWidth={true} onClick={handleDeposit}>
                            Realizar Depósito
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
};

export default Deposit;
