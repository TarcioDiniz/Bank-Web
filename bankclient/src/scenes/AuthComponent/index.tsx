import React, { useState } from 'react';
import Account from "../../data/Account";
import axios from "axios";
import {Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {setAuthenticatedAccount} from "../../data/globals";


interface AuthComponentProps {
    authenticateUser: (account: Account) => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ authenticateUser }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Move us
    const handleAuthentication = async () => {
        try {
            const response = await axios.post('http://localhost:8080/V1/bank/authenticate', {email, password});
            const accountData: Account = response.data;

            // Armazena a conta autenticada na variável global
            setAuthenticatedAccount(accountData);
            authenticateUser(accountData); // Atualiza o estado de autenticação no componente App
            setError(null);
            navigate("/Home");

            // Agora, a variável authenticatedAccount está acessível em qualquer lugar
            //console.log(authenticatedAccount);
        } catch (error) {
            console.error('Erro durante a autenticação:', error);
            setError('Erro durante a autenticação. Verifique suas credenciais.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 100 }}>
                <Typography variant="h5" component="div" align="center">
                    Login
                </Typography>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAuthentication}  // Corrigi a chamada para a função correta
                        style={{ marginTop: 20 }}
                    >
                        Entrar
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};


export default AuthComponent;
