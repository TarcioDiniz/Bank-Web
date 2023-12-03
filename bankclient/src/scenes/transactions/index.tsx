// Transactions.tsx

import React, {useEffect} from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useState} from 'react';
import {transactions} from "../../data/mockData";
import {tokens} from "../../theme";
import {getAuthenticatedAccount} from "../../data/globals";
import PixOutlinedIcon from '@mui/icons-material/PixOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

const categoryIcons: { [key: string]: JSX.Element } = {
    'Cafe and Restaurant': <RestaurantIcon/>,
    'Groceries': <ShoppingBasketIcon/>,
    'Pix': <PixOutlinedIcon sx={{color: "#18b6b6"}}/>,
    'Deposit': <LocalAtmOutlinedIcon/>
    // Add more categories and corresponding icons as needed
};

interface Transaction {
    transactionName: string;
    transactionCategory: string;
    transactionValue: string;
}

const Transactions = () => {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const accountId = getAuthenticatedAccount()?.id;
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    const fetchAccountBalance = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/transactions/${accountId}`);
            if (response.ok) {
                const data: Transaction[] = await response.json();
                // Assuming you want to update the state with the entire array of transactions
                setTransactions(data);
            } else {
                console.error('Failed to fetch account balance. Status:', response.status);
            }
        } catch (error) {
            console.error('Error during fetchAccountBalance:', error);
        }
    };


    useEffect(() => {
        // Fetch initially
        fetchAccountBalance();

        // Fetch every 10 seconds
        const intervalId = setInterval(fetchAccountBalance, 10000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [accountId, fetchAccountBalance]);


    return (
        <Box>
            <List>
                {Array.isArray(transactions) && transactions.map((transaction, index) => (
                    // Use shorthand syntax for fragments
                    <React.Fragment key={index}>
                        <ListItem
                            button
                            style={{cursor: 'pointer', backgroundColor: hoverIndex === index ? colors.purple[100] : 'transparent'}}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(-1)}
                        >
                            <Avatar style={{marginRight: 15}}>
                                {categoryIcons[transaction.transactionCategory]}
                            </Avatar>
                            <ListItemText
                                primary={<Typography variant="h6" color="black" style={{fontWeight: 'bold'}}>{transaction.transactionName}</Typography>}
                                secondary={
                                    <Box>
                                        <Box display="flex">
                                            <Typography color={colors.black[200]} display="inline">{transaction.transactionCategory}</Typography>
                                            <Typography
                                                color={Number(transaction.transactionValue) < 0 ? 'black' : 'green'}
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    textAlign: "right",
                                                    marginLeft: 'auto',
                                                }}
                                            >
                                                {Number(transaction.transactionValue) > 0 ? "+" : "-"} R${Number(transaction.transactionValue) > 0 ? Number(transaction.transactionValue) : Number(transaction.transactionValue) * -1}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                        {index < transactions.length - 1 && <Divider style={{backgroundColor: `${colors.black[99]}`}}/>}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

export default Transactions;
