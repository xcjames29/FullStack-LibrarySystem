import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Book, Delete } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BooksList() {
    let [loading, setLoading] = useState(true);
    let [book, setBooks] = useState([]);
    let [openDialog, setOpenDialog] = useState(false);
    let storage = window.localStorage;
    const url = "http://localhost:8111/books"
    let getBooks = async () => {
        let token = storage.getItem("token");
        console.log(token);
        let response = await axios(
            {
            method:"GET",
            url:url,
            headers:{
                'Authorization':"Bearer "+token
            }
        });
        console.log(response);
        if(response){
            setBooks(response.data);
            setLoading(false);
        }   
    }
    let [title,setTitle] = useState("");
    let [id,setId] = useState("");
    useEffect(() => {
        getBooks();
           // eslint-disable-next-line
    }, [])
    return (
        <Paper elevation={3}>
            {loading ? (<CircularProgress />) :
         
                <List>
                    <Typography variant="h3" gutterBottom style={{padding:"10px 30px"}}>
                       Book List
                    </Typography>
                    <Divider />
                    {book.map((e) =>
                        <ListItem key={e._id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Book />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={e.title} secondary={e.authors.join(", ")} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={()=>{
                                    setTitle(e.title);
                                    setId(e._id)
                                    setOpenDialog(true);
                                }} color="secondary">
                                    <Delete  />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            }
            {openDialog&&
                <DeleteDialog delete_id={id} title={title} dialogOpen={setOpenDialog}/>
            }
        </Paper>
    )
}

function DeleteDialog({title, delete_id, dialogOpen}){
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const url = "http://localhost:8111/books"
    let deleteItem = async(id) =>{
        console.log(id);
        let newAxios = {
            'method':"delete",
            'url': url,
            'data':{
                '_id':id
            }
        }
        try{
            let response =  await axios(newAxios);
            console.log(response.status)
        }
        catch(e){
            console.log(e)
        }
    }
  
    const handleClose = () => {
      dialogOpen(false);
    };
    return(
        <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete "+title+ "?"}</DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus onclick={()=>deleteItem(delete_id)}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
}