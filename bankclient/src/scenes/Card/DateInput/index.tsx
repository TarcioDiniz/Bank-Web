import React, { useState, ChangeEvent, useEffect } from "react";
import { TextField } from "@mui/material";
import {useAlert} from "../AlertContextProps";

const DateInput: React.FC = () => {
    const { showAlert } = useAlert();
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];

        if (selectedDate >= currentDate) {
            setDate(selectedDate);
        } else {
            showAlert('A data não pode ser anterior à data de hoje.', 'error');
        }
    };


    return (
        <TextField
            label="Data"
            type="date"
            fullWidth
            value={date}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
            disabled
        />
    );
};

export default DateInput;
