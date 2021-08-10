import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../state/provider";

const SingleProduct = ({ item }) => {
  const [{}, dispatch] = useGlobalState()

  if (localStorage.getItem('cart') == undefined || null) {
    var cart = {}
  } else {
    cart = JSON.parse(localStorage.getItem('cart'))
  }

  const addToLocalStorage = (item) => {
    updateLocalStorage(item)
  }

  var updateLocalStorage = (item) => {
    var idStr = item.id.toString()
    dispatch({ type: 'PAGE_RELOAD', page_reload: idStr })

    if (cart[idStr] != null || undefined) {
      cart[idStr]['qty'] = cart[idStr]['qty'] + 1
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    else {
      var id = item.id
      var title = item.title
      var qty = 1
      var price = item.sell_price
      cart[idStr] = { 'id':id,'qty':qty, 'title':title, 'price':price }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  return (
    <div className="card mb-3 mr-0" style={{ width: "15rem" }}>
      <Link to={`/product_details/${item.id}/`}>
        <img
          src={item.image}
          style={{ height: "10rem" }}
          className="card-img-top"
          alt="Not Available"
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <h6 className="card-title">
          Price: <del>Tk. {item.market_price}</del> Tk. {item.sell_price}
        </h6>
        <p className="card-text" style={{fontSize:"0.8rem"}}>
          {item.description.substring(0,50)}...<Link to={`/product_details/${item.id}/`}>more</Link>
        </p>
        <button onClick={()=>addToLocalStorage(item)} className="btn btn-sm btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
