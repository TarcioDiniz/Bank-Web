import React, { useState, ChangeEvent, useEffect } from "react";
import { TextField } from "@mui/material";

const DateInput: React.FC = () => {
    const [date, setDate] = useState<string | null>(null);

    useEffect(() => {
        // Preencher a data atual quando o componente for montado
        const today = new Date();
        const formattedToday = formatDate(today);
        setDate(formattedToday);
    }, []);

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/[^0-9]/g, "");
        const formattedDate = sanitizeAndFormatDate(sanitizedValue);

        // Permitir que o usuário apague o campo ou insira uma nova data
        setDate(formattedDate);
    };

    const sanitizeAndFormatDate = (value: string): string => {
        const match = value.match(/(\d{2})(\d{2})(\d{4})/);

        if (match) {
            const formattedDate = match.slice(1, 4).join("/");
            return formattedDate.substring(0, 10);
        }

        return value; // Permitir que o usuário digite uma nova data
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <TextField
            label="Data"
            variant="outlined"
            fullWidth
            margin="normal"
            value={date || ''}
            onChange={handleDateChange}
        />
    );
};

export default DateInput;
