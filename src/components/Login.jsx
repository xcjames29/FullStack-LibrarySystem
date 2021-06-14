import { Button, Divider, makeStyles, Paper,TextField , Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: '15px',
        padding: '24px'
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      input: {
        display: 'none',
      },

}));

export default function Login(){
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState('');
    let [error,setError] = useState("");
    let classes = useStyles();
    let storage = window.localStorage;
    let history = useHistory();
    const signupUrl = "http://localhost:8111/login";
    let submitForm = async () => {
        console.log(email, password);
        let response = await fetch(signupUrl,{
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'email': email,
                'password': password
            })
        });
        let data = await response.json();
        console.log(data)
        if(data.status){
            console.log(data.result);
            storage.setItem("token",data.result.ACCESS_TOKEN);
            history.push("/books");
        }
        else setError(data.result)
    }
    return(
        <Paper elevation={4} className={classes.container}>
        <Typography variant="h4">
            Login
        </Typography>
        <Divider />
        <TextField label="Email" name="email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" name="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="raised" color="primary" disabled={!email || !password} variant="contained" onClick={() => submitForm()}> Login </Button>
        {error}
    </Paper>
    )
}