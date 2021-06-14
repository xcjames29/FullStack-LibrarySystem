import { AppBar, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Book, Category, ChevronLeft, ListAlt, Menu, Person } from "@material-ui/icons";
import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import BooksList from "./BooksList";
import Signup from "./Signup";
import Login from "./Login";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));



export default function Main() {
    const classes = useStyles();
    let [open, setOpen] = useState(false);
    
    return (
        <div>
            <Router>
                <React.Fragment>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >   
                    <Typography variant="h5" style={{marginTop:"15px"}}>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={() => setOpen(false)}>
                                <ChevronLeft />
                            </IconButton>
                            Menu
                        </div> 
                        </Typography>
                        <Divider />
                        <List>
                            {['Books', 'Categories', 'Members', 'Issue Book'].map((text, index) => (
                                <a key={text} href={"/" + text.split(" ")[0].toLowerCase()} >
                                    <ListItem button onClick={() => {
                                        console.log(text.split(" ")[0])
                                        let path = "/" + text.split(" ")[0].toLowerCase();
                                        console.log(path)
                                    }}>
                                        <ListItemIcon>{index === 0 ? <Book /> : index === 1 ? <Category /> : index === 2 ? <Person /> : <ListAlt />}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                </a>
                            ))}
                        </List>
                        <Divider />
                    </Drawer>
                </React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            My Library Management
                </Typography>
                        <a href="/login" style={{textDecoration:"none", color:"white"}}><Button color="inherit"> Login</Button> </a>
                </Toolbar>
                </AppBar>

                <Switch>
                    <Container fixed>
                        <Route exact path="/" >
                            <h1> Welcome to MyLibrary!</h1>
                        </Route>
                        <Route path="/books">
                            <BooksList />
                        </Route>
                        <Route path="/categories">
                            <h1>Categories</h1>
                        </Route>
                        <Route path="/members">
                            <h1>Members </h1>
                        </Route>
                        <Route path="/issue">
                            <h1>Issue Books </h1>
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Container>
                </Switch>

            </Router>
        </div>
    )
}