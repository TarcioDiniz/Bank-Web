import React, {ForwardedRef, forwardRef, useState} from 'react';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    FormControl,
    FormHelperText, Grid,
    IconButton, Input, InputAdornment, InputBaseComponentProps,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StringAvatar from "../../utilities/StringAvatar";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IMaskInput} from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}


const Settings: React.FC = () => {


    // Dados mockados
    const dadosMockados = {
        Avatar: "",
        NomeCompleto: 'Tarcio Diniz',
        CPF: "084.743.564-40",
        sexo: "M",
        agencia: '1234',
        conta: '56789',
        telefone: '83991931035',
        _email: "teste@gmail.com",
        senha: "undefined"
    };

    const [contato, setContato] = useState(dadosMockados.telefone);
    const [senha, setSenha] = useState(dadosMockados.senha);
    const [email, setEmail] = useState(dadosMockados._email);
    const [avatar, setAvatar] = useState(dadosMockados.Avatar);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);


    const TextMaskCustom = forwardRef(
        function TextMaskCustom(
            props: CustomProps & InputBaseComponentProps,
            ref: ForwardedRef<HTMLInputElement>
        ) {
            const {onChange, ...other} = props;
            return (
                <IMaskInput
                    {...other}
                    mask="(#0) 0 0000-0000"
                    definitions={{
                        '#': /[1-9]/,
                    }}
                    inputRef={ref}
                    onAccept={(value: any) => {
                        const event = {
                            target: {
                                name: props.name,
                                value,
                            },
                        };
                        onChange(event as React.ChangeEvent<HTMLInputElement>);
                    }}
                    overwrite
                />
            );
        }
    );

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Informações do cliente foram atualizadas!');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        setValue(e.target.value);
    };


    return (
        <Grid sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Box width="98%">
                <Card
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: "#645b72"}}
                >
                    <Grid sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Box width="95%">
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: "center",
                                    marginTop: 2,
                                    marginBottom: 2
                                }}
                            >

                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    badgeContent={
                                        <label htmlFor="icon-button-file">
                                            <IconButton component="span" aria-label="upload">
                                                <EditIcon/>
                                            </IconButton>
                                        </label>
                                    }
                                >
                                    <Avatar
                                        {...avatar == "" || avatar == null ? StringAvatar(dadosMockados.NomeCompleto) : null}
                                        src={avatar != "" || avatar != null ? avatar : ""}
                                        sx={{width: 80, height: 80}}
                                    />


                                </Badge>

                                <input
                                    accept="image/*"
                                    type="file"
                                    id="icon-button-file"
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                />


                            </Box>

                            <TextField sx={{marginBottom: 2}} label="Full Name" value={dadosMockados.NomeCompleto}
                                       disabled
                                       variant="filled" fullWidth/>

                            <TextField sx={{marginBottom: 2}} label="CPF" value={dadosMockados.CPF} disabled variant="filled" fullWidth/>


                            <TextField
                                label="Account"
                                variant="filled"
                                fullWidth
                                required
                                value={dadosMockados.conta}
                                disabled
                                sx={{marginBottom: 2}}
                            />
                            <TextField
                                label="Agency"
                                variant="filled"
                                fullWidth
                                required
                                value={dadosMockados.agencia}
                                disabled
                                sx={{marginBottom: 2}}
                            />

                            <FormControl sx={{marginBottom: 2}} fullWidth required>
                                <InputLabel sx={{marginTop: 2}} id="sexo-label">Sex</InputLabel>
                                <Select
                                    value={dadosMockados.sexo}
                                    labelId="sexo-label"
                                    id="sexo"
                                    label="Sex"
                                    disabled
                                    variant="filled"
                                >
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Feminino</MenuItem>
                                </Select>
                            </FormControl>


                            <FormControl sx={{marginBottom: 2}} fullWidth required variant="filled">
                                <TextField
                                    label="Contact"
                                    value={contato}
                                    onChange={(e) => handleInputChange(e, setContato)}
                                    name="textmask"
                                    id="formatted-text-mask-input"
                                    InputProps={{
                                        inputComponent: TextMaskCustom,
                                    }}
                                />
                            </FormControl>


                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                                sx={{marginBottom: 2}}
                            />

                            <FormControl sx={{marginBottom: 2}} fullWidth>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    value={senha}
                                    required
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => handleInputChange(e, setSenha)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>

                            {error && <FormHelperText error>{error}</FormHelperText>}

                            <Button sx={{marginBottom: 2}} fullWidth type="submit" variant="contained" color="primary">
                                Salvar Alterações
                            </Button>
                        </Box>
                    </Grid>
                </Card>
            </Box>
        </Grid>
    );
};

export default Settings;
