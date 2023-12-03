import {Box, Grid, Typography, useTheme} from "@mui/material";
import { useEffect, useState } from "react";
import {getAuthenticatedAccount} from "../../../data/globals";


interface AccountBalanceResponse {
    amount: string;
}

const BalanceCard: React.FC = () => {
    const theme = useTheme();
    const colors = theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.secondary;

    const accountId = getAuthenticatedAccount()?.id;
    const [balance, setBalance] = useState<string | null>(null);

    const fetchAccountBalance = async () => {
        try {
            const response = await fetch(`http://localhost:8080/V1/bank/getAccountBalance/${accountId}`);
            if (response.ok) {
                const data: AccountBalanceResponse = await response.json();
                if (data.amount !== undefined) {
                    setBalance(data.amount);
                } else {
                    console.error('Invalid data received from the server:', data);
                }
            } else {
                console.error('Failed to fetch account balance. Status:', response.status);
            }
        } catch (error) {
            console.error('Error during fetchAccountBalance:', error);
        }
    };

    useEffect(() => {
        // Fetch initially
        fetchAccountBalance();

        // Fetch every 10 seconds
        const intervalId = setInterval(fetchAccountBalance, 10000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [accountId, fetchAccountBalance]);

    return (
        <Box>
            <Typography variant="h6" gutterBottom
                        style={{
                            color: colors.main,
                            fontWeight: "bold"
                        }}>
                Total Balance
            </Typography>
            <Typography marginTop={2} variant="h4" gutterBottom
                        style={{
                            color: colors.dark,
                            fontWeight: "bold"
                        }}>
                R$ {balance !== null ? balance : 'Loading...'}
            </Typography>

            {/*<Grid container spacing={2} style={{marginTop: 20}}>
                <Grid item xs={6} style={{textAlign: "left"}}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{color: colors.light, fontWeight: "bold"}}
                    >
                        Income
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{color: colors.light, fontWeight: "bold"}}>
                        R$ 2.222,00
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{textAlign: "right"}}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{color: colors.light, fontWeight: "bold"}}
                    >
                        Expenses
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{color: colors.light, fontWeight: "bold"}}>
                        R$ 2.222,00
                    </Typography>
                </Grid>
            </Grid>*/}
        </Box>
    );
}

export default BalanceCard;
