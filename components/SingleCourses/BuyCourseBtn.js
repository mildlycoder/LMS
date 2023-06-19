import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";

const BuyCourseBtn = ({ current_user, course }) => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();
	const router = useRouter();

	const buyCourse = (courseCart) => {
		let courseObj = {};
		courseObj["id"] = courseCart.id;
		courseObj["title"] = courseCart.title;
		courseObj["slug"] = courseCart.slug;
		courseObj["price"] = courseCart.latest_price;
		courseObj["regular_price"] = courseCart.before_price;
		courseObj["image"] = courseCart.image;
		courseObj["lessons"] = courseCart.lessons;
		courseObj["duration"] = courseCart.duration;
		courseObj["access_time"] = courseCart.access_time;
		courseObj["quantity"] = 1;
		courseObj[
			"instructor"
		] = `${courseCart.user.first_name} ${courseCart.user.last_name}`;
		dispatch({
			type: "ADD_TO_CART",
			data: courseObj,
		});
		router.push("/checkout");
	};

	return (
		<>
			<button
				onClick={() => buyCourse(course)}
				className="default-btn buy"
			>
				Buy This Course Now
			</button>
			<p className="text-center">30-Day Money-Back Guarantee</p>
		</>
	);
};

export default BuyCourseBtn;
