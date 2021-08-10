import React, { useState, useEffect } from 'react'
import {  } from 'react-router'
import { BrowserRouter, Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'
import {usePath} from 'hookrouter'
import Axios from 'axios'
import {domain, usertoken, header} from './env'

import {useGlobalState} from './state/provider'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import ProductDetails from './components/ProductDetails'
import Category from './components/Category'
import SingleCategory from './components/SingleCategory'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import OldOrders from './components/OldOrders'


const App = () => {
  const [{ profile, page_reload }, dispatch] = useGlobalState()
  var [homeUrl, setHomeUrl] = useState(usePath())


  useEffect(() => {
    if (usertoken !== null) {
        const userData = async() => {
            await Axios({
                method: 'get',
                url: `${domain}/api/profile/`,
                headers: header,
            }).then(res => {
              dispatch({
                type: "ADD_PROFILE",
                profile: res.data['data'],
              })
            }).then(err => {
                // console.log(err);
            })
        }
        userData()
    }
  }, [page_reload])


  return (
      <BrowserRouter>
      <Navbar />
      {homeUrl == '/' ? <Category/> : ""}
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/product_details/:id/" component={ProductDetails}/>
          <Route exact path="/category/:id/" component={SingleCategory}/>
          <Route exact path="/register/" component={RegisterPage}/>
          <Route exact path="/login/" component={LoginPage}/>
          <Route exact path="/profile/" component={ProfilePage}/>
          <Route exact path="/cart/" component={CartPage}/>
          <Route exact path="/checkout/" component={CheckoutPage}/>
          <Route exact path="/old_orders/" component={OldOrders}/>
        </Switch>
      </BrowserRouter>
  
  )
}

export default App
