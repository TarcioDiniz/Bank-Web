import React from 'react';
import { Box, Button, CardContent, Typography, useTheme } from '@mui/material';
import { tokens } from "../../../theme";

const Invoice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Replace with your actual values
    const availableLimit = 1000;
    const currentInvoice = 500;
    const upcomingInvoicesLimit = availableLimit - currentInvoice;
    const currentInvoiceClosingDate = '07 DEC'; // Replace with your actual date

    const fontSizeDescription = "15px";

    const handlePayInvoice = () => {
        // Logic to pay the invoice
        console.log('Invoice paid!');
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
                    $ {availableLimit.toFixed(2)}
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
                    $ {currentInvoice.toFixed(2)}
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
                    $ {upcomingInvoicesLimit.toFixed(2)}
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
                    style={{ width: '100%' }} // Setting the width as 100%
                >
                    Pay Invoice
                </Button>
            </CardContent>
        </Box>
    );
};

export default Invoice;
