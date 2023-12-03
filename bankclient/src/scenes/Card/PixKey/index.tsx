import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
    useTheme,
    Alert, Card,
} from '@mui/material';
import {tokens} from '../../../theme';
import {useAlert} from "../AlertContextProps";
import DeleteIcon from '@mui/icons-material/Delete';
import {getAuthenticatedAccount} from "../../../data/globals";

interface PixKeyProps {
    severity: 'error' | 'warning' | 'info' | 'success';
    message: string;
}

const PixKey: React.FC = () => {
    // Destructure theme and tokens for better readability
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {showAlert} = useAlert();

    // Use a more descriptive name for the state variable
    const [pixKeys, setPixKeys] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPixKey, setNewPixKey] = useState('');
    const [notification, setNotification] = useState<PixKeyProps | null>(null);

    // Use arrow function syntax for consistency
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const getPixAcount = async () => {
        try {
            const accountId = getAuthenticatedAccount()?.id;
            const response = await fetch(`http://localhost:8080/V1/bank/pix/${accountId}`);
            if (response.ok) {
                setPixKeys(await response.json())
            } else {
                console.error('Failed to fetch account balance. Status:', response.status);
            }


        } catch (error) {
            console.error('Error during fetchAccountBalance:', error);
        }
    };

    useEffect(() => {
        // Fetch initially
        getPixAcount();

        // Fetch every 1000 seconds
        const intervalId = setInterval(getPixAcount, 1000000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    },);


    const isPixKeyDuplicate = (key: string): boolean => {
        const cleanedKey = key.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        const cleanedPixKeys = pixKeys.map((pixKey) => pixKey.toLowerCase()); // Convert existing keys to lowercase
        return cleanedPixKeys.includes(cleanedKey);
    };


    const getPixKeyType = (key: string): string => {
        const cnpjRegex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
        const emailRegex = /\S+@\S+\.\S+/;
        const cleanedKey = key.replace(/\D/g, ''); // Remove non-numeric characters
        const cpfRegex = /^(\d{3}\.?){2}\d{3}\-?\d{2}$/;

        if (emailRegex.test(key)) {
            return 'E-mail:';
        } else if (cpfRegex.test(cleanedKey)) {
            return 'CPF:';
        } else if (cnpjRegex.test(key)) {
            return 'CNPJ:';
        } else {
            return 'Chave Aleatória:';
        }
    };

    const handleAddPixKey = async () => {
        if (!newPixKey.trim()) {
            showAlert('Pix key cannot be empty.', 'error');
            return;
        }

        if (pixKeys.length < 5) {
            if (!isPixKeyDuplicate(newPixKey)) {
                setPixKeys([...pixKeys, newPixKey]);

                const pixData = {
                    accountId: getAuthenticatedAccount()?.id, // Substitua pelo valor real
                    pixKey: newPixKey,

                };

                // Envie a requisição POST para a rota desejada
                const response = await fetch('http://localhost:8080/V1/bank/addPixKey', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pixData),
                });

                // Verifique se a resposta é bem-sucedida (status 200)
                if (response.status === 200) {
                    // Limpe os dados do formulário
                    setNewPixKey('');

                    // Exiba um alerta de sucesso
                    showAlert('Pix key added successfully.', 'success');
                    closeDialog();
                } else {
                    // Se a resposta não for bem-sucedida, exiba um alerta de erro
                    showAlert('Erro ao realizar a transferência. Tente novamente mais tarde.', 'error');
                }


            } else {
                showAlert('Duplicate Pix key. Please enter a unique key.', 'error');
            }
        } else {
            showAlert('You already have 5 Pix keys. Please delete one before adding a new one.', 'error');
        }
    };


    const handleDeletePixKey = async (index: number) => {
        const deletedPixKey = pixKeys[index];
        const updatedPixKeys = pixKeys.filter((key, i) => i !== index);

        const pixData = {
            accountId: getAuthenticatedAccount()?.id, // Substitua pelo valor real
            pixKey: deletedPixKey,

        };

        // Envie a requisição POST para a rota desejada
        const response = await fetch('http://localhost:8080/V1/bank/deletePixKey', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pixData),
        });

        // Verifique se a resposta é bem-sucedida (status 200)
        if (response.status === 200) {

            // Exiba um alerta de sucesso
            showAlert(`Pix key "${deletedPixKey}" deleted successfully.`, 'success');
        } else {
            // Se a resposta não for bem-sucedida, exiba um alerta de erro
            showAlert('Error performing the transfer. Try again later.', 'error');
        }

        setPixKeys(updatedPixKeys);
        showAlert(`Pix key "${deletedPixKey}" deleted successfully.`, 'success');
    };

    const handlePayInvoice = () => {
        console.log('Invoice paid!');
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

        setNewPixKey(data);
    };


    return (
        <Box style={{position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column'}}>
            <CardContent>
                <Typography marginBottom={1} variant="h4"
                            style={{color: colors.black[900], fontWeight: 'bold', marginBottom: 20}}>
                    Your Pix Keys
                </Typography>

                {pixKeys.map((pixKey, index) => (
                    <Card sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 1,
                        background:
                            "linear-gradient(113deg, rgba(255, 255, 255, 0.51) 0%, rgba(255, 255, 255, 0) 100%)",
                        boxShadow: "10.252809524536133px 12.30337142944336px 20.505619049072266px rgba(0, 0, 0, 0.05)",
                        borderRadius: 3,
                        border: "1.23px white solid",
                        backdropFilter: "blur(14.35px)",
                        position: "relative",
                    }} key={index}>
                        <CardContent>
                            <Typography style={{color: colors.white1[700]}}>
                                {getPixKeyType(pixKey)} <span
                                style={{color: colors.white1[900], fontWeight: '800'}}>{pixKey}</span>
                            </Typography>
                        </CardContent>
                        <Button
                            variant="outlined"
                            style={{
                                color: colors.red[400],
                                borderColor: "transparent"
                            }}
                            onClick={() => handleDeletePixKey(index)}
                        >
                            <DeleteIcon/>
                        </Button>
                    </Card>
                ))}

                {notification && (
                    <Box marginTop={1}>
                        <Alert severity={notification.severity as 'error' | 'warning' | 'info' | 'success'}>
                            {notification.message}
                        </Alert>
                    </Box>
                )}

                <Dialog open={isDialogOpen} onClose={closeDialog}>
                    <DialogTitle>Add New Pix Key</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter the new Pix key:</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="CPF/CNPJ or Email"
                            fullWidth
                            value={newPixKey}
                            onInput={(e) => handleFormatChange(e as React.FormEvent<HTMLInputElement>, 'emailCpfCnpj')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} variant="contained">
                            Cancel
                        </Button>
                        <Button onClick={handleAddPixKey} variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Botão "Add new key" adicionado ao final do componente Box */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={openDialog}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: 16,  // Ajuste conforme necessário
                        width: "60%",
                        background: colors.black[700]
                    }}
                >
                    Add new key
                </Button>
            </CardContent>
        </Box>

    );
};

export default PixKey;
