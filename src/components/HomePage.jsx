import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { domain } from '../env'
import SingleProduct from './SingleProduct'


const HomePage = () => {

  const [products, setProducts] = useState(null)

  useEffect(() => {
    const getData = async () => {
      await Axios({
        method: "get",
        url:`${domain}/api/products/`
      })
        .then((res) => {
          setProducts(res.data)
        })
        .catch((err) => {
        console.log(err);
      })
    }
    getData()
  },[])

  return (
    <div className="container-fluid">
      <div className="row container-row">
        <div className="col-md-2">
        </div>
        <div className="col-md-9">
          <h2>All Products</h2>
          <div className="row product-container">
            {products && products?.results.map((item, index) => {
              return (
                <div key={index} className="col-sm-4 col-md-3">
                  <SingleProduct item={item}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

