import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

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
        width: 500,
        height: "75vh",
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
}));

const tileData = [
    {
        title: "Image",
        author: "author",
    },
    {
        title: "Image2",
        author: "author",
    },
    {
        title: "Image3",
        author: "author",
    },
    {
        title: "Image3",
        author: "author",
    },
    {
        title: "Image3",
        author: "author",
    },
    {
        title: "Image3",
        author: "author",
    },
    {
        title: "Image3",
        author: "author",
    },
    {
        title: "Image3",
        author: "author",
    },
];

function App() {
    const classes = useStyles();

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
                            {tileData.map((tile) => (
                                <GridListTile key={tile.img}>
                                    <img src={tile.img} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={
                                            <span>by: {tile.author}</span>
                                        }
                                        actionIcon={
                                            <IconButton
                                                aria-label={`info about ${tile.title}`}
                                                className={classes.icon}
                                            >
                                                <InfoIcon />
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
