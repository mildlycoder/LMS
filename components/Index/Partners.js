import React, { useEffect, useState, useRef } from "react";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

const Partners = () => {
	const [partners, setPartners] = useState([]);

	useEffect(() => {
		const fetchPartners = async () => {
			const url = `${baseUrl}/api/partners`;
			const response = await axios.get(url);
			setPartners(response.data.partners);
		};
		fetchPartners();
	}, []);

	if (partners.length == 0) return;

	return (
		<div className="partner-area bg-color-f2f0ef ptb-100">
			<div className="container">
				<Swiper
					breakpoints={{
						0: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						576: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						992: {
							slidesPerView: 6,
							spaceBetween: 30,
						},
					}}
					className="tpartner-slide"
				>
					{partners.length > 0 &&
						partners.map((partner) => (
							<SwiperSlide key={partner.id}>
								<motion.div
									className="partner-item"
									initial="hidden"
									whileInView="visible"
									transition={{
										type: "spring",
										duration: 3,
										bounce: 0.3,
									}}
									variants={{
										visible: { opacity: 1, scale: 1 },
										hidden: { opacity: 0, scale: 0 },
									}}
								>
									<img
										src={partner.partner_image}
										alt={partner.name}
									/>
								</motion.div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default Partners;
