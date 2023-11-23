import React, { useState } from 'react';
import {InputAdornment, TextField} from '@mui/material';

const MoneyInput: React.FC = () => {
    const [amount, setAmount] = useState<string>('');

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

        // Remove tudo que não é dígito
        inputValue = inputValue.replace(/\D/g, '');

        // Remove os zeros à esquerda
        inputValue = inputValue.replace(/^0+/, '');

        // Adiciona a máscara
        if (inputValue.length > 2) {
            inputValue = `${inputValue.slice(0, -2)}.${inputValue.slice(-2)}`;
        } else if (inputValue.length > 0) {
            inputValue = `0.${inputValue}`;
        } else {
            inputValue = '';
        }

        setAmount(inputValue);
    };

    return (
        <TextField
            label="Value"
            variant="outlined"
            fullWidth
            margin="normal"
            value={amount}
            onChange={handleAmountChange}
            InputProps={{
                startAdornment:  <InputAdornment position="start">
                    R$&nbsp;{/* &nbsp; é um espaço não quebrável */}
                </InputAdornment>,
            }}
        />
    );
};

export default MoneyInput;
