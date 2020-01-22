import axios from 'axios';

export const AxiosWithAuth = (props) => {
    const token = localStorage.getItem('token');

    if(token === "undefined") {
        console.error("TRYING TO MAKE API CALLS BUT NOT LOGGED IN");
    }
    else {
        console.log("LOGGED IN ", {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        });
    }

    return axios.create({
        baseURL: "https://gitstatus-app.herokuapp.com/api/"/*TODO: add API URL*/,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    });
};