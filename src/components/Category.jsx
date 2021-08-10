import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { useState, useEffect, } from 'react'
import {domain} from '../env'

const Category = () => {
    const [categories, setCategories] = useState(null)
    
    useEffect(() => {
        const getCategories = async () => {
            await Axios({
                method: 'get',
                url:`${domain}/api/category/`
            }).then(res => {
                setCategories(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
        getCategories()
    }, [])

  

    return (
        <div className="dropdown container-fluid">
            <Link to="#" className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                All Categories
            </Link>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {categories !== null && categories?.data?.map((category, index) => {
                    return (
                        <Link type="button" key={index} to={`/category/${category.id}/`} className="dropdown-item">{category.title}</Link>
                    )
                })}
            </ul>

        </div>
    )
}

export default Category
