import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        width: "100%",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        minWidth: 400,
        maxWidth: "75vw",
        height: "75vh",
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#bc9642",
        color: "#282c34",
        // color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 15,
    },
}))(Tooltip);

function App() {
    const classes = useStyles();

    const [merchData, setMerchData] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        Axios.get("http://localhost:4000/").then((merch) => {
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
                    <div className={classes.root}>
                        <GridList
                            cellHeight={180}
                            className={classes.gridList}
                            cols={4}
                        >
                            <GridListTile
                                key="Subheader"
                                cols={4}
                                style={{ height: "auto" }}
                            >
                                {/* <ListSubheader component="div">
                                    December
                                </ListSubheader> */}
                            </GridListTile>
                            {merchData.map((merch) => (
                                <GridListTile key={merch.image}>
                                    <img src={merch.image} alt={merch.name} />
                                    <GridListTileBar
                                        title={merch.name}
                                        subtitle={
                                            <span>Price: {merch.price}</span>
                                        }
                                        actionIcon={
                                            <IconButton
                                                aria-label={`info about ${merch.name}`}
                                                className={classes.icon}
                                            >
                                                <LightTooltip
                                                    title={merch.name}
                                                    arrow
                                                >
                                                    <InfoIcon />
                                                </LightTooltip>
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <footer>MADE WITH ♡ + PASSION</footer>
                </Container>
            </header>
        </div>
    );
}

export default App;
