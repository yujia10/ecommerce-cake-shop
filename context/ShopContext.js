import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const ShopContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(0);

  let foundProduct;
  let index;

  const addProduct = (product, quantity) => {
    const checkProduct = cartItems.find((item) => item._id === product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProduct) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const removeProduct = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);

    setTotalPrice((prevPrice) => {
      return prevPrice - foundProduct.price * foundProduct.quantity;
    });

    setTotalQuantities((prevQuantity) => prevQuantity - foundProduct.quantity);
  };

  const changeCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
      setTotalQuantities((prevQuantity) => prevQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
        setTotalQuantities((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 === 0) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        addProduct,
        setShowCart,
        changeCartItemQuantity,
        removeProduct,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useShopContext = () => useContext(Context);
