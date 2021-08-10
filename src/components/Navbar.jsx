import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../state/provider";

const Navbar = () => {

  const [{ profile }, { }] = useGlobalState();

  let cart = JSON.parse(localStorage.getItem('cart'))
  if (cart !== null || undefined) {
    var cart_products = Object.values(cart)
    var total_qty = 0
    for (var i = 0; i < cart_products.length; i++) {
      total_qty += cart_products[i]['qty']
    }
  }
  else {
    total_qty = 0
  }
  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ fontSize: "1rem" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mars Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {profile !== null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile/">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <b className="nav-link">{profile.prouser['username']}</b>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#" onClick={() => {
                    window.localStorage.removeItem('token');
                    window.location.href = '/'}}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register/">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login/">
                    Login
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart/">
                Cart({total_qty})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
