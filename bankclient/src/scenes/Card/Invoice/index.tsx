import React from 'react';
import { Box, Button, CardContent, Typography, useTheme } from '@mui/material';
import { tokens } from "../../../theme";
import {useAlert} from "../AlertContextProps";

const Invoice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {showAlert} = useAlert();

    // Replace with your actual values
    const availableLimit = "***";
    const currentInvoice = "***";
    const upcomingInvoicesLimit = "***";
    const currentInvoiceClosingDate = '** ***'; // Replace with your actual date

    const fontSizeDescription = "15px";

    const handlePayInvoice = () => {
        // Logic to pay the invoice
        showAlert('Error, this function is not available to you.', 'error');
    };

    return (
        <Box>
            <CardContent>
                <Typography marginBottom={1} variant="h4" style={{
                    color: `${colors.black[600]}`,
                    fontWeight: "bold"
                }}>Invoice Summary</Typography>

                <Typography style={{
                    color: `${colors.black[400]}`,
                    fontWeight: "bold"
                }}>
                    R$ {availableLimit}
                </Typography>
                <Typography marginBottom={1} fontSize={fontSizeDescription} style={{
                    color: `${colors.black[300]}`,
                }}>
                    ● Available Limit.
                </Typography>
                <Typography fontSize={24} style={{
                    color: "black",
                    fontWeight: "bold"
                }}>
                    R$ {currentInvoice}
                </Typography>
                <Typography marginBottom={1} fontSize={fontSizeDescription} style={{
                    color: `${colors.black[300]}`,
                }}>
                    ● Current Invoice.
                </Typography>
                <Typography style={{
                    color: `${colors.black[400]}`,
                    fontWeight: "bold"
                }}>
                    R$ {upcomingInvoicesLimit}
                </Typography>
                <Typography marginBottom={1} fontSize={fontSizeDescription} style={{
                    color: `${colors.black[300]}`,
                }}>
                    ● Upcoming Invoices.
                </Typography>
                <Typography style={{
                    color: `${colors.black[600]}`,
                }} marginBottom={2}>
                    Closes on <span style={{ fontWeight: "800" }}>{currentInvoiceClosingDate}</span>
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayInvoice}
                    style={{ width: '100%' ,background: colors.black[700]}} // Setting the width as 100%
                >
                    Pay Invoice
                </Button>
            </CardContent>
        </Box>
    );
};

export default Invoice;
