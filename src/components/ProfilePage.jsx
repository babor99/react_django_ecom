import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { useGlobalState } from '../state/provider'
import {domain, header} from "../env";


const ProfilePage = () => {
    const [{ profile }, dispatch] = useGlobalState()
    const [firstname, setFirstname] = useState(profile?.prouser?.first_name)
    const [lastname, setLastname] = useState(profile?.prouser?.last_name)
    const [email, setEmail] = useState(profile?.prouser?.email)
    const [image, setImage] = useState(null)
    console.log('image', image);
    let formData = new FormData()
    formData.append('image', image)

    const updateUserImage = async (e) => {
        e.preventDefault()
        await Axios({
            method: 'post',
            url: `${domain}/api/profile_update/`,
            headers: header,
            data:formData,
        }).then(res => {
            dispatch({
                type: 'PAGE_RELOAD',
                page_reload: res.data,
            })
        }).then(err => {
            // console.log(err);
        })
    }

    const updateUserData = async (e) => {
        e.preventDefault()
        await Axios({
            method: 'post',
            url: `${domain}/api/profile/`,
            headers: header,
            data: {
                'id': profile?.prouser?.id,
                'first_name': firstname,
                'last_name': lastname,
                'email': email
            }
        }).then(res => {
            dispatch({
                type: 'PAGE_RELOAD',
                page_reload: res.data,
            })
        }).then(err => {
            console.log(err);
        })
    }

 
    return (
        <div className='container-fluid ' style={{ fontSize:'1.5rem'}}>
            <div className="row" style={{justifyContent:'center', alignItems:'center'}}>
                <div className="col-md-4">
                    <img className='rounded-circle' style={{height:'10rem', width:'9rem'}} src={profile?.image} alt="Not found" />
                    <h4>Username: {profile?.prouser?.username}</h4>
                    <h4>Name: {profile?.prouser?.first_name} {profile?.prouser?.last_name}</h4>
                    <h4>Email: {profile?.prouser?.email}</h4>
                </div>
            </div>
            <div className="row" style={{justifyContent:'center', alignItems:'center'}}>
                <div className="col-md-9">
                    <form onSubmit={updateUserImage}>
                    <div className="form-group mb-3">
                        <label htmlFor="image1" className="form-label">First Name</label>
                        <input onChange={(e)=>setImage(e.target.files[0])} type="file" className="form-control" id="image1"/>
                    </div>
                    <button className="btn btn-success form-control" type="submit">Update Profile Image</button>
                    </form>

                    <form onSubmit={updateUserData}>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInput1" className="form-label">First Name</label>
                            <input value={firstname} onChange={(e)=>setFirstname(e.target.value)} name="username" type="text" className="form-control" id="exampleInput1"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInput2" className="form-label">Last Name</label>
                            <input value={lastname} onChange={(e)=>setLastname(e.target.value)} name="password" type="text" className="form-control" id="exampleInput2"/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="exampleInput3" className="form-label">Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} name="password" type="email" className="form-control" id="exampleInput3"/>
                        </div>
                        <button className="btn btn-success form-control" type="submit">Update Details</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage
