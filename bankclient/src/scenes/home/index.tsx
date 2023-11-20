import React from "react";
import {Box, Grid, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import Transactions from "../transactions";
import BalanceCard from "../Card/BalanceCard";
import CreditCard from "../Card/CreditCard";
import Invoice from "../Card/Invoice";
import QuickTransfer from "../Card/QuickTransfer";
import BinanceGraphic from "../graphics/BinanceGraphic";
import InfomationAvatar from "../Card/InfomationAvatar";


const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid sx={{marginTop: 3}} container spacing={2}>
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
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 5
                        }} width={400} height={220} bgcolor={colors.purple[200]} borderRadius={2}>
                            <Typography variant="h6" color={colors.white2[900]}
                                        style={{marginLeft: 20, fontWeight: "bold"}}>
                                BTC/BRL
                            </Typography>
                            <Box sx={{width: "90%", height: "90%"}}>
                                <BinanceGraphic/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid marginTop={4}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 3
                    }} width={840} height={450} bgcolor={colors.red[200]} borderRadius={2}>
                        <Box sx={{width: "90%", height: "90%"}}>
                            {/* Typography fixed at the top */}
                            <Typography variant="h4" color={colors.white2[900]}
                                        style={{marginBottom: 20, fontWeight: "bold"}}>
                                Credit Card
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{marginRight: 35}}>
                                        <CreditCard/>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: 3
                                    }} width={290} height={135} bgcolor={colors.blue[200]} borderRadius={3}>
                                        <Box sx={{width: "90%", height: "90%"}}>
                                        <InfomationAvatar/>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box
                                        style={{
                                            width: "380px",
                                            height: "340px",
                                            background:
                                                "linear-gradient(113deg, rgba(255, 255, 255, 0.51) 0%, rgba(255, 255, 255, 0) 100%)",
                                            boxShadow: "10.252809524536133px 12.30337142944336px 20.505619049072266px rgba(0, 0, 0, 0.05)",
                                            borderRadius: 8,
                                            border: "1.23px white solid",
                                            backdropFilter: "blur(14.35px)",
                                            position: "relative",
                                        }}
                                    >
                                        <Invoice/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
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
                <Grid marginTop={4}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }} width={600} height={207} bgcolor={colors.white1[901]} borderRadius={2}>
                        <Box sx={{width: "90%", height: "90%"}}>
                            {/* Typography fixed at the top */}
                            <Typography variant="h6" color={colors.white2[100]}
                                        style={{marginBottom: 20, fontWeight: "bold"}}>
                                Quick Transfer
                            </Typography>
                            <QuickTransfer/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;
