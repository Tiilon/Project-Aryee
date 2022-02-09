import { Component } from 'react'
import {authAxios} from "../services/httpServices"


class Logout extends Component {
    
    componentDidMount(){
        // authAxios.post("token/blacklist/", {
        //     refresh_token: localStorage.getItem('refresh_token'),
        // })
        // localStorage.removeItem("access_token")
        // localStorage.removeItem("refresh_token")
        // authAxios.defaults.headers['Authorization'] = null;
        // window.location = '/auth/login';
    }

    render() { 
        return null
    }
}
 
export default Logout;