import "./App.css";
import { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        display: "flex",
        flexFlow: "column",
        margin: theme.spacing(2),
        width: theme.spacing(50),
        height: theme.spacing(95),

        // "& > *": {
        //     margin: theme.spacing(2),
        //     width: theme.spacing(35),
        //     height: theme.spacing(10),
        // },
    },
    gridRoot: {
        flexGrow: 1,
        flexWrap: "wrap",
        backgroundColor: "white",
        // height: "74vh",
    },
    title: {
        fontSize: 14,
        flex: 1,
    },
    availableTbl: {
        width: "70%",
        display: "flex",
    },
    media: {
        height: 0,
        paddingTop: "100%", // 16:9
    },
}));

function App() {
    const classes = useStyles();

    const [merchData, setMerchData] = useState([]);

    useEffect(() => {
        Axios.get("/api/merch").then((merch) => {
            console.log(merch.data);
            setMerchData(merch.data);
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <CssBaseline />
                <Container
                    maxWidth="false"
                    disableGutters
                    style={{ height: "100vh" }}
                >
                    <h1>DAVID GOGGINS RESTOCK SITE</h1>
                    {/* <div className={classes.root}> */}
                    <Grid
                        container
                        justify="center"
                        className={classes.gridRoot}
                    >
                        {merchData.map((merch) => (
                            <Paper
                                className={classes.paperRoot}
                                variant="contained"
                                key={merch.image}
                                elevation={3}
                            >
                                <CardContent>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {merch.name}
                                    </Typography>
                                    <CardMedia
                                        className={classes.media}
                                        image={merch.image}
                                        title={merch.name}
                                    />
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        PRICE: {merch.price}
                                    </Typography>
                                    <div className={classes.availableTbl}>
                                        <Typography
                                            className={classes.title}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            {merch.variants.map((item) => (
                                                <p>Size: {item.size}</p>
                                            ))}
                                        </Typography>
                                        <Typography
                                            className={classes.title}
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            {merch.variants.map((item) => (
                                                <p>
                                                    Availability:
                                                    {item.available
                                                        ? "Available"
                                                        : "Sold Out"}
                                                </p>
                                            ))}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Paper>
                        ))}
                    </Grid>
                    {/* <footer>MADE WITH ♡ + PASSION</footer> */}
                </Container>
            </header>
        </div>
    );
}

export default App;
