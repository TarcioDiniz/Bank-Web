// Transactions.tsx

import React from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useState} from 'react';
import {transactions} from "../../data/mockData";
import {tokens} from "../../theme";

const categoryIcons: { [key: string]: JSX.Element } = {
    'Cafe and Restaurant': <RestaurantIcon/>,
    'Groceries': <ShoppingBasketIcon/>,
    // Add more categories and corresponding icons as needed
};

const Transactions = () => {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <List>
                {transactions.map((transaction, index) => (
                    // Use shorthand syntax for fragments
                    <>
                        <ListItem
                            button
                            style={{cursor: 'pointer', backgroundColor: hoverIndex === index ? colors.purple[100] : 'transparent'}}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(-1)}
                        >
                            <Avatar style={{marginRight: 15}}>
                                {categoryIcons[transaction.category]}
                            </Avatar>
                            <ListItemText
                                primary={<Typography variant="h6" color="black"
                                                     style={{fontWeight: 'bold'}}>{transaction.merchant}</Typography>}
                                secondary={
                                    <Box>
                                        <Box display="flex">
                                            <Typography
                                                color={colors.black[200]}
                                                display="inline">{transaction.category}</Typography>

                                            <Typography
                                                color={transaction.amount < 0 ? 'black' : 'green'}
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    textAlign: "right",
                                                    marginLeft: 'auto',
                                                }}
                                            >
                                                {transaction.amount > 0 ? "+" : "-"} R${transaction.amount > 0 ? transaction.amount : transaction.amount * -1}
                                            </Typography>
                                        </Box>
                                    </Box>
                                }

                            />
                        </ListItem>
                        {index < transactions.length - 1 &&
                            <Divider style={{backgroundColor: `${colors.black[99]}`}}/>}
                    </>
                ))}
            </List>
        </Box>
    );
}

export default Transactions;
