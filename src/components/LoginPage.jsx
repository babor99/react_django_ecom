import React from 'react'
import { Redirect } from "react-router";
import Axios from "axios";
import { domain } from "../env";


const LoginPage = () => {
    
    const getLoginToken = async(e) => {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        console.log(username, password);
        await Axios({
            method: "post",
            url: `${domain}/api/login/`,
            data: {
                'username': username,
                'password': password,
            }
        }).then(res => {
            window.localStorage.setItem('token', res.data.token);
            window.location.href = '/'

        }).catch(err => {
            console.log(err)
            alert('username or password is incorrect. please try with correct username or password')

        })
        
    }
    
    return (
        <div className="container-fluid" style={{fontSize:"1rem"}}>
            <div className="row" style={{justifyContent:'center'}}>
                <div className="col-md-6 login-form-container">
                    <h2>Login</h2>
                    <form className="" onSubmit={getLoginToken}>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInput1" className="form-label">Username</label>
                            <input name="username" type="text" className="form-control" id="exampleInput1" placeholder="Enter username"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInput2" className="form-label">Password</label>
                            <input name="password" type="password" className="form-control" id="exampleInput2" placeholder="Enter password"/>
                        </div>
                        <button className="btn btn-success form-control" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
