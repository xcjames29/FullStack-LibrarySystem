import axios from 'axios';
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"

let history = createBrowserHistory();
axios.defaults.baseURL = "http://localhost:3000/";
let storage = window.localStorage;
axios.interceptors.request.use(
    function (req) {
        let token = localStorage.getItem('token');
        console.log(token);
        if (!token) console.log("Token not found")
        else req.headers["autorization"] = "Bearer " + token;
        return req;
    }, function (error) {
        console.log("Error!", error.message)
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        console.log("Error:", error.response.status);
        let { status } = error.response;
        let token = localStorage.getItem('token');
        if (token  && status === 403) {
            const url = "http://localhost:8111/token"
            let refreshToken = localStorage.getItem("refresh_token")
           
            let response =  await axios(
                {
                method:"POST",
                url:url,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data:{
                    refreshToken: refreshToken
                }
            });
            console.log(response);
            if(response.data.status){
                let newToken = response.data.result.ACCESS_TOKEN;
                console.log(newToken);
                storage.setItem("token",newToken);
                history.push('/books')
            }
            else history.push('/login');
      
        }
        else if(status === 403){
            history.push('/login');
        }
        return Promise.reject(error);
    }
);


export default function HistoryProvider(props) {
    return <Router history={history}> {props.children} </Router>
}