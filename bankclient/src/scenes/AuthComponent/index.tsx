import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {setAuthenticatedAccount} from '../../data/globals';
import Account from "../../data/Account";

interface AuthComponentProps {
    authenticateUser: (account: Account) => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({authenticateUser}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [registered, setRegistered] = useState(false); // Novo estado para controle de registro
    const [fullName, setFullName] = useState<string>('');
    const [cpf, setCPF] = useState<string>('');
    const [phoneContact, setPhoneContact] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuthentication = async () => {
        try {
            let response;
            if (isRegister) {
                // Registration logic
                response = await axios.post('http://localhost:8080/V1/bank/register', {
                    fullName,
                    cpf,
                    phoneContact,
                    email,
                    password,
                });
                setRegistered(true); // Atualiza o estado para indicar que o registro foi concluído
            } else {
                // Authentication logic
                response = await axios.post('http://localhost:8080/V1/bank/authenticate', {
                    email,
                    password,
                });
                const accountData: Account = response.data;
                setAuthenticatedAccount(accountData);
                authenticateUser(accountData);
                setRegistered(false); // Reinicia o estado após a autenticação
                navigate('/Home');
            }
        } catch (error) {
            console.error('Erro durante a autenticação/registro:', error);
            setError('Erro durante a autenticação/registro. Verifique suas credenciais.');
        }
    };

    useEffect(() => {
        if (registered) {
            // Se registrado com sucesso, muda para o modo de autenticação
            setIsRegister(false);
            setRegistered(false); // Reinicia o estado para futuros registros
        }
    }, [registered]);

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{padding: 20, marginTop: 100}}>
                <Typography variant="h5" component="div" align="center" sx={{marginBottom: 2}}>
                    {isRegister ? 'Registrar' : 'Login'}
                </Typography>
                <form noValidate>
                    {isRegister && (
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Nome Completo"
                                name="fullName"
                                autoComplete="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                sx={{marginBottom: 2}}
                            />
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                autoComplete="cpf"
                                value={cpf}
                                onChange={(e) => setCPF(e.target.value)}
                                sx={{marginBottom: 2}}
                            />
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneContact"
                                label="Telefone de Contato"
                                name="phoneContact"
                                autoComplete="tel"
                                value={phoneContact}
                                onChange={(e) => setPhoneContact(e.target.value)}
                                sx={{marginBottom: 2}}
                            />
                        </Grid>
                    )}
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
                        sx={{marginBottom: 2}}
                    />
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
                        sx={{marginBottom: 2}}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAuthentication}
                        style={{marginTop: 18}}
                    >
                        {isRegister ? 'Registrar' : 'Entrar'}
                    </Button>
                    <Grid container justifyContent="flex-end" style={{marginTop: 10}}>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => setIsRegister(!isRegister)}>
                                {isRegister
                                    ? 'Já possui uma conta? Faça login aqui.'
                                    : 'Não possui uma conta? Registre-se aqui.'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AuthComponent;
