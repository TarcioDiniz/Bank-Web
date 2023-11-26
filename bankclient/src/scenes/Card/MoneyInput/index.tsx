// MoneyInput.tsx
import React from 'react';
import { InputAdornment, TextField } from '@mui/material';

interface MoneyInputProps {
    value: string;
    onChange: (value: string) => void;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange }) => {
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = inputValue.replace(/^0+/, '');

        if (inputValue.length > 2) {
            inputValue = `${inputValue.slice(0, -2)}.${inputValue.slice(-2)}`;
        } else if (inputValue.length > 0) {
            inputValue = `0.${inputValue}`;
        } else {
            inputValue = '';
        }

        onChange(inputValue);
    };

    return (
        <TextField
            label="Value"
            variant="outlined"
            fullWidth
            margin="normal"
            value={value}
            onChange={handleAmountChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">
                    R$&nbsp;
                </InputAdornment>,
            }}
        />
    );
};

export default MoneyInput;
