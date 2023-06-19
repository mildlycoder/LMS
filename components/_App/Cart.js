import React from "react";
import Link from "@/utils/ActiveLink";
import { useSelector } from "react-redux";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);

	return (
		<li>
			<Link href="/checkout">
				<a className="cart">
					<i className="ri-shopping-cart-line"></i>
					<span>{cartItems.length}</span>
				</a>
			</Link>
		</li>
	);
};

export default Cart;
