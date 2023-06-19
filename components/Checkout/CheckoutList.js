import React from "react";
import Link from "next/link";
import { motion, useIsPresent } from "framer-motion";

const CheckoutList = ({
	id,
	image,
	title,
	instructor,
	slug,
	price,
	regular_price,
	lessons,
	duration,
	access_time,
	onRemove,
}) => {
	const isPresent = useIsPresent();
	const anitmations = {
		style: {
			position: isPresent ? "static" : "absolute",
		},
		initial: { scale: 0, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		exit: { scale: 0, opacity: 0 },
	};
	return (
		<motion.li
			className="single-cart-list d-flex justify-content-between align-items-center"
			layout
			{...anitmations}
		>
			<div className="single-cart-content d-flex align-items-center">
				<Link href={`/course/${slug}`}>
					<a>
						<img src={image} alt={title} />
					</a>
				</Link>
				<div className="single-cart-contents">
					<h3>
						<Link href={`/course/${slug}`}>
							<a>{title}</a>
						</Link>
					</h3>
					<p>By {instructor}</p>
					<ul className="lectures">
						<li>
							{lessons} <span>Lectures</span>
						</li>
						<li>
							{duration} <span>Total Length</span>
						</li>
					</ul>
				</div>
			</div>
			<div className="prw">
				<h4>
					{regular_price > 0 && <del>${regular_price}</del>} ${price}
				</h4>
				<div className="wis-rem d-flex align-items-center">
					<button onClick={() => onRemove(id)} className="remove">
						Remove
					</button>
				</div>
			</div>
		</motion.li>
	);
};

export default CheckoutList;
