import React from 'react'
import Axios from 'axios'
import {domain, header} from '../env'

const RegisterPage = () => {

    const getLoginToken = async(e) => {
        e.preventDefault()
        let username = e.target.username.value
        let email = e.target.email.value
        let password1 = e.target.password1.value
        let password2 = e.target.password2.value
        console.log(username, email, password1);

        if (password1 === password2) {
            await Axios({
                method: "post",
                url: `${domain}/api/register/`,
                data: {
                    'username': username,
                    'email': email,
                    'password': password1,
                }
            }).then(res => {
                console.log(res);
                if (res.data['error'] == true) {
                    alert(res.data['message'])
                }
                else {
                    alert(`Registration is successfull for user '${username}'`)
                    window.location = '/login/'
                }
            }).catch(err => {
    
            })
        }
        else {
            alert("Password didn't match. Try again..")
        }
        
    }

    return (
        <div className="container-fluid" style={{fontSize:"1rem"}}>
            <div className="row" style={{justifyContent:'center'}}>
                <div className="col-md-6 login-form-container">
                    <h2>Register</h2>
                    <form className="" onSubmit={getLoginToken}>
                        <div className="form-group mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" className="form-control" placeholder="Enter username" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label  className="form-label">Email</label>
                            <input name="email" type="email" className="form-control" placeholder="Enter email" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Password</label>
                            <input name="password1" type="password" className="form-control" placeholder="Enter password" required/>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input name="password2" type="password" className="form-control" placeholder="Confirm password" required/>
                        </div>
                        <button className="btn btn-success form-control" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
