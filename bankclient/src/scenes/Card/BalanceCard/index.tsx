import {Grid, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";

const BalanceCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <>
        <Typography variant="h6" gutterBottom
                    style={{
                        color: `${colors.black[300]}`,
                        fontWeight:"bold"
                    }}>
            Total Balance
        </Typography>
    <Typography marginTop={2} variant="h4" gutterBottom
                style={{
                    color: "black",
                    fontWeight:"bold"
                }}>
        R$ 2.222,00
    </Typography>

    <Grid container spacing={2} style={{marginTop: 20}}>
        <Grid item xs={6} style={{textAlign: "left"}}>
            <Typography
                variant="subtitle1"
                gutterBottom
                style={{color: `${colors.black[400]}`,fontWeight:"bold"}}
            >
                Income
            </Typography>
            <Typography variant="h6" gutterBottom style={{color: `${colors.black[400]}`,fontWeight:"bold"}}>
                R$ 2.222,00
            </Typography>
        </Grid>
        <Grid item xs={6} style={{textAlign: "right"}}>
            <Typography
                variant="subtitle1"
                gutterBottom
                style={{color: `${colors.black[400]}`,fontWeight:"bold"}}
            >
                Expenses
            </Typography>
            <Typography variant="h6" gutterBottom style={{color: `${colors.black[400]}`, fontWeight:"bold"}}>
                R$ 2.222,00
            </Typography>
        </Grid>
    </Grid>
        </>
    );
}

export default BalanceCard;