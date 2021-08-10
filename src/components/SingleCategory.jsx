import Axios from "axios";
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { domain } from "../env";
import SingleProduct from "./SingleProduct";

const SingleCategory = () => {
    const { id } = useParams()
    let [catProducts, setCatProducts] = useState(null)
    useEffect(() => {
        const getCatProducts = async () => {
            await Axios({
                method: "get",
                url:`${domain}/api/category/${id}/`
            }).then(res => {
                setCatProducts(res.data)
            }).catch(err => {
                //  console.log(err);
             })
        }
        getCatProducts()
    }, [id])

    return (
    <div className="container-fluid">
      <div className="row container-row">
        <div className="col-md-2"></div>
        <div className="col-md-9">
          <h2>{catProducts?.data[0]?.title}</h2>
          <div className="row product-container">
                {
                catProducts !== null && catProducts?.data[0]?.category_products?.map((product, index) => {
                    return (
                        <div key={index} className="col-sm-4 col-md-3">
                            <SingleProduct item={product} />
                        </div>
                    )
                    })
                }
          </div>
        </div>
      </div>
    </div>
    )
}

export default SingleCategory
