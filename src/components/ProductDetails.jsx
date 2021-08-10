import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import {domain} from '../env'
import SingleProduct from './SingleProduct'

const ProductDetails = () => {
    const { id } = useParams()
    const [currentProduct, setCurrentProduct] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState(null)

    useEffect(() => {
        const getCurrentProduct = async () => {
            await Axios({
                method: "get",
                url:`${domain}/api/products/${id}/`
            }).then((res) => {
                setCurrentProduct(res.data)
                getRelatedProducts(res?.data?.category['id'])
            }).catch((err) => {
                // console.log(err);
            })
        }
        getCurrentProduct()

    }, [])

    const getRelatedProducts = async (id) => {
        await Axios({
            method: "get",
            url:`${domain}/api/category/${id}/`
        }).then(res => {
            setCategoryProducts(res?.data)
        }).catch(err => {
            // console.log(err);
        })
    }
    console.log(categoryProducts?.data[0]?.category_products);

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-12 current-item-container">
                    {currentProduct !== null &&
                        (
                        <div className="current-item-container text-center">
                            <img style={{height:"40rem", width:"50rem"}} src={currentProduct.image}/><hr/>
                            <h2>Product: {currentProduct.title}</h2>
                            <h3>Price: <del>Tk.{currentProduct.market_price}</del> Tk.{currentProduct.sell_price}</h3>
                            <h4>Added On: {currentProduct.added_on}</h4>
                            <h4>About The Product:</h4>
                            <p style={{fontSize:"1rem"}}>{ currentProduct.description }</p>
                        </div>
                    )
                    }
                </div>
            </div><hr/>
            <div className="row">
                {categoryProducts?.data[0]?.category_products?.map((product, index) => {
                    return (
                        <div key={index} className="col-md-3">
                            <SingleProduct item={product}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductDetails
