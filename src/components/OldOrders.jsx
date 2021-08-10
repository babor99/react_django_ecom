import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import { domain, header, usertoken } from '../env'

function OldOrders() {
    const [orders, setOrders] = useState(null)
    useEffect(() => {
        if (usertoken !== null) {
            const fetchOldOrders = async () => {
                await Axios({
                    method:'get',
                    url: `${domain}/api/old_orders/`,
                    headers:header,
                }).then(res => {
                    setOrders(res.data)
                    console.log(res);
                })
            }
            fetchOldOrders()
        }
    }, [])

    return (
        <div className='container-fluid' style={{ fontSize: '1rem' }}>           
            <div className="row" style={{justifyContent:'center', alignItems:'center'}}>
                <div className="col-md-8 text-center">
                    <h2>Checkout</h2>
                        <table className="table table-striped table-primary">
                        <thead>
                            <tr>
                            <th scope="col">Sl. no.</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Discount(%)</th>
                            <th scope="col">Total(Tk.)</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            orders?.data?.map((orders, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{orders.email}</td>
                                        <td>{orders.mobile}</td>
                                        <td>{orders.address}</td>
                                        <td>{orders.discount}</td>
                                        <td>{orders.total}</td>
                                        <td>{orders.added_on.toLocaleString()}</td>
                                        <td>{orders.order_status}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
               
            </div>
        </div>
    )
}

export default OldOrders
