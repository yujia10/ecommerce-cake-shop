import React from "react";
import Link from "next/link";
import { AiOutlineShopping  } from "react-icons/ai";
import {GiCupcake} from "react-icons/gi"

import { Cart } from "./"

import { useShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useShopContext();

  return (
    <div className="navbar-container">
      <p className="logo" >
        <Link href="/"><GiCupcake /></Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
