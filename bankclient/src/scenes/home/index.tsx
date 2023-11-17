// Home.tsx

import React from "react";
import {Box, Grid, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import Transactions from "../transactions";
import BalanceCard from "../BalanceCard";
import ChartView from "../chartView";


const dataBase = {
    months: ["7/2022", "8/2022", "9/2022", "10/2022"],
    income: [3500, 2500, 1500, 500],
    expense: [3500, 2500, 1500, 500],
}

let arrIndice = Object.keys(dataBase);
let arrValues = Object.values(dataBase);

export let data: Array<Array<string | number>> = [];

for (let i = 0; i < arrValues[0].length; i++) {
    data[i] = arrValues.map((item) => {
        return item[i];
    })
}

data.unshift(arrIndice);





const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const chartColors = {
        backgroundColor: colors.blue[200],
        columnColor: colors.red[100], // Set your desired column color
        columnWidth:1, // Set your desired column width
    };

    const chartData: Array<Array<string | number>> = [
        ["Month", "Income", "Expense"],
        ["7/2022", 3500, 3500],
        ["8/2022", 2500, 2500],
        ["9/2022", 1500, 1500],
        ["10/2022", 500, 500],
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <Grid container spacing={2}>
                    <Grid>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 5
                        }} width={400} height={220} bgcolor={colors.blue[100]} borderRadius={2}>
                            <Box sx={{width: "90%", height: "90%"}}>
                                <BalanceCard/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 5
                        }} width={400} height={220} bgcolor={colors.blue[100]} borderRadius={2}>
                            <Box sx={{width: "90%", height: "90%"}}>
                                <BalanceCard/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid sx={{backgroundColor:`${colors.red[900]}`}}>
                    <Box sx={{
                        width:"90%",
                        height:"90%"
                    }}>
                        <ChartView {...chartColors} chartData={chartData} />
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={5}>
                <Box>
                    {/* Typography fixed at the top */}
                    <Typography variant="h4" color="black" style={{marginBottom: 5}}>
                        Transactions
                    </Typography>
                    <div style={{overflowY: "auto", height: 400, width: 600}}>
                        <Transactions/>
                    </div>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
