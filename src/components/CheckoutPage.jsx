import React, { useState } from 'react'
import { useGlobalState } from '../state/provider'
import {domain, header, usertoken} from '../env'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'


function CheckoutPage() {
    const [{ }, dispatch] = useGlobalState()
    const [mobile, setMobile] = useState(null)
    const [email, setEmail] = useState(null)
    const [address, setAddress] = useState(null)

    const [error, setError] = useState(null)
    const [message, setMessage] = useState('')

    var cart = JSON.parse(localStorage.getItem('cart'))
    if (cart != undefined || null) { 
        var isEmpty = Object.keys(cart).length == 0
    }
    var cart_total = 0
    if (cart != null || undefined) {
        var items = Object.values(cart)
        for (let i = 0; i < items.length; i++){
            let subtotal = 0
            subtotal += (items[i]['qty'] * items[i]['price'])
            cart_total += subtotal
        }
    }

    const placeOrder = async () => {
        if (usertoken != null || undefined) {
            let formData = { 'mobile': mobile, 'email': email, 'address':address}
            await Axios({
                method: 'post',
                url: `${domain}/api/place_order/`,
                headers: header,
                data:[cart, formData],
            }).then(res => {
                setError(res.data['error'])
                setMessage(res.data['message'])
            })
        }
        else {
            alert('To place an order, you have to login first. Please login..');
            window.location.href = "/login/"
        }
    }
    

    if (error == false) {
        alert(message)
        localStorage.removeItem('cart');
        window.location.href = "/"
    }
    if (error == true) {
        alert(message)
    }

    return (
        <div className='container-fluid' style={{ fontSize: '1rem' }}>           
            <div className="row" style={{justifyContent:'center', alignItems:'center'}}>
                <div className="col-md-6 text-center">
                    <h2>Checkout</h2>
                    {isEmpty || cart == undefined ? (<div><h1>Opps..</h1><h2>You have no items in your cart. Please add some items.</h2></div>) : (
                        <table className="table table-success table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Sl. no.</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            items?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price * item.qty}</td>
                                        
                                    </tr>
                                )
                            })
                            }
                            <tr>
                                <th style={{marginLeft:'2rem'}} colSpan="5">Total: BDT {cart_total.toLocaleString()}/-</th>
                            </tr>
                        </tbody>
                    </table>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="mt-2">
                        <h3>Enter Your Contact Info.</h3>
                            <div className="form-group mb-3">
                                <label htmlFor="ei1" className="form-label">Mobile No.</label>
                                <input onChange={(e)=>setMobile(e.target.value)} type="phone" required className="form-control" id="ei1" placeholder="Enter mobile no."/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="ei2" className="form-label">Email</label>
                                <input onChange={(e)=>setEmail(e.target.value)} type="email" required className="form-control" id="ei2" placeholder="Enter email"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exi" className="form-label">Address</label>
                                <input onChange={(e) => setAddress(e.target.value)} type="address" required className="form-control" id="ei3" placeholder="Enter address"/>
                            </div>
                            <button onClick={()=>placeOrder()} type="button" className='btn btn-success form-control'>Place Order</button>
                    </div>
                </div>
            </div>
            {cart != undefined && (
                <div className="row mt-1" style={{justifyContent:'center', alignItems:'center'}}>
                    <div className="col-md-7" style={{ display: 'flex', justifyContent:'space-between'}}>
                        <Link to="/cart/" className='btn btn-info'>Update Cart</Link>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default CheckoutPage
