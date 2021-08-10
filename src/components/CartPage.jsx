import React from 'react'
import { useGlobalState } from '../state/provider'
import {domain, header, usertoken} from '../env'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function CartPage() {
    const [{}, dispatch] = useGlobalState()

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

    const addItemToLocalStorage = (item) => {
        increaseQuantity(item)
      }
      const increaseQuantity = (item) => {
        var idStr = item.id.toString()
        dispatch({ type: 'PAGE_RELOAD', page_reload: idStr })
        if (cart[idStr] != null || undefined) {
          cart[idStr]['qty'] = cart[idStr]['qty'] + 1
          localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    

    const removeItemFromLocalStorage = (item) => {
        decreaseQuantity(item)
    }
      const decreaseQuantity = (item) => {
        var idStr = item.id.toString()
        dispatch({ type: 'PAGE_RELOAD', page_reload: idStr })
        if (cart[idStr] != null || undefined) {
            cart[idStr]['qty'] = cart[idStr]['qty'] - 1
            if (cart[idStr]['qty'] == 0) {
                let cart_items = Array.from(Object.entries(cart))
                var filteredItems = cart_items?.filter((itm) => {
                    return itm[1]['id'] != idStr
                })
                var newCart = {}
                for (var i = 0; i < filteredItems.length; i++){
                    for (var j = 0; j < filteredItems[i].length; j++){
                        newCart[filteredItems[i][0]] = filteredItems[i][1]
                    }
                }
                cart = newCart
                console.log('new items', newCart);
            }
          localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    
    const deleteItemFromLocalStorage = (item) => {
        removeItem(item)
    }
      const removeItem = (item) => {
        var idStr = item.id.toString()
        dispatch({ type: 'PAGE_RELOAD', page_reload: idStr })
        let cart_items = Array.from(Object.entries(cart))
        var filteredItems = cart_items?.filter((itm) => {
            return itm[1]['id'] != idStr
        })
        var newCart = {}
        for (var i = 0; i < filteredItems.length; i++){
            for (var j = 0; j < filteredItems[i].length; j++){
                newCart[filteredItems[i][0]] = filteredItems[i][1]
            }
        }
        // cart = newCart
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    function clearCart() {
        localStorage.removeItem('cart')
        dispatch({type:'PAGE_RELOAD', page_reload: cart})
    }

    return (
        <div className='container-fluid' style={{ fontSize:'1.2rem'}}>
            <div className="row" style={{justifyContent:'center', alignItems:'center'}}>
                <div className="col-md-9">
                    <h2>My Cart</h2>
                    {isEmpty || cart == undefined ? (<div><h1>Opps..</h1><h2>You have no items in your cart. Please add some items.</h2></div>) : (
                        <table className="table table-success table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Sl. no.</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Action</th>  
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
                                        <td>
                                         <button onClick={()=>removeItemFromLocalStorage(item)} className="btn btn-warning" type="button">-</button><span> </span>
                                         <button onClick={()=>deleteItemFromLocalStorage(item)} className="btn btn-danger" type="button">X</button><span> </span>
                                         <button onClick={()=>addItemToLocalStorage(item)} className="btn btn-primary" type="button">+</button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            <tr>
                                <th style={{marginLeft:'2rem'}} colSpan="5">Total: BDT {cart_total.toLocaleString()}/-</th>
                                <th><button onClick={()=>clearCart()} colSpan="1" className='btn btn-danger'>Clear Cart</button></th>
                            </tr>
                        </tbody>
                    </table>
                    )}
                </div> 
            </div>
            {cart != undefined && (
                <div className="row" style={{justifyContent:'center', alignItems:'center'}}>
                <div className="col-md-9" style={{ display: 'flex', justifyContent:'space-between'}}>
                    <Link to="/old_orders/" className='btn btn-info'>Recent Orders</Link>
                    <Link to="/checkout/" className='btn btn-success'>Checkout</Link>
                </div>
            </div>
            )
            }
        </div>
    )
}

export default CartPage
