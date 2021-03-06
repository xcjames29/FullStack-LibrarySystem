import { Button, Divider, makeStyles, Paper, TextField,  Typography } from "@material-ui/core";
import {  useState } from "react";


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
export default function Signup() {

    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [email, setEmail] = useState("");
    let [image,setImage] = useState("");
    let [error, setError] = useState("");
    let classes = useStyles();

    const signupUrl = "http://localhost:8111/signup";
    let submitForm = async () => {
        console.log(name, password, email);
        let formData = new FormData();
        formData.append('username',name);
        formData.append('password',password);
        formData.append('email',email);
        if(image !== null) formData.append('image',image);
       console.log("image",image)
        let response = await fetch(signupUrl,{
            method: "POST",
            body: formData
        });
        console.log(await response);
        if(response.status===201){
            setName("");
            setPassword("");
            setEmail("");
            setImage("");
        }
        else{
            setError(response.statusText);
        }
    }

    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant="h4">
                Signup
            </Typography>
            <Divider />
            <TextField label="Name" name="username" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" name="email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" name="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField label="Confirm-Password" variant="outlined" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={(e)=> setImage(e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload Avatar
                </Button>
                {image.name}
            </label>
            {error}
            <Button type="raised" color="secondary" disabled={!name || !email || !password || password !== confirmPassword} variant="contained" onClick={() => submitForm()}> Submit </Button>
        </Paper>

    )
}