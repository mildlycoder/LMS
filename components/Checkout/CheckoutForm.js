import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateCartTotal,
  calculateCartTotalMinus,
} from "@/utils/calculateCartTotal";
import CheckoutList from "./CheckoutList";
import PlaceOrderBtn from "./PlaceOrderBtn";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutForm = ({ user }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [cartAmout, setCartAmaount] = React.useState(0);
  const [cartAmoutMinus, setCartAmaountMinus] = React.useState(0);

  useEffect(() => {
    const { cartTotal } = calculateCartTotal(cartItems);
    const { cartTotalMinus } = calculateCartTotalMinus(cartItems);
    setCartAmaount(cartTotal);
    setCartAmaountMinus(cartTotalMinus);
  }, [cartItems]);

  const handleRemove = async (cartId) => {
    dispatch({
      type: "REMOVE_CART",
      id: cartId,
    });
  };

  return (
    <div className="cart-area ptb-100">
      <div className="container">
        <p className="your-cart">
          <span>{cartItems.length}</span> courses in your cart
        </p>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="cart-content">
              <ul className="single-cart">
                {cartItems.length > 0 ? (
                  <AnimatePresence>
                    {cartItems.map((cart) => (
                      <CheckoutList
                        key={cart.id}
                        {...cart}
                        onRemove={() => handleRemove(cart.id)}
                      />
                    ))}
                  </AnimatePresence>
                ) : (
                  <>
                    <motion.div
                      className="col-lg-12 text-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <h3
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#0000001f",
                          fontSize: "93px",
                        }}
                      >
                        Empty
                      </h3>
                      <Link href="/courses">
                        <a className="default-btn">Continue Shopping</a>
                      </Link>
                    </motion.div>
                  </>
                )}
              </ul>
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="col-lg-4">
              <div className="cart-total">
                <h3>
                  Total <span>${cartAmout}</span>
                </h3>
                <ul>
                  {cartAmoutMinus > 0 && (
                    <li>
                      <del>${cartAmoutMinus}</del>
                    </li>
                  )}
                </ul>

                <PlaceOrderBtn user={user} cartItems={cartItems} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
