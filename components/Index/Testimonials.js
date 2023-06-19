import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";

const Testimonials = () => {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		const fetchTests = async () => {
			const url = `${baseUrl}/api/testimonials`;
			const response = await axios.get(url);
			setTestimonials(response.data.testimonials);
		};
		fetchTests();
	}, []);

	return (
		<div className="testimonial-area pt-100 pb-70">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6">
						<div className="testimonial-img">
							<img
								src="/images/testimonials/testimonial-1.png"
								alt="testimonial"
							/>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="testimonials-conetent">
							<h2>
								Our Students Are Our Strength. See What They Say
								About Us
							</h2>

							<Swiper
								pagination={{
									clickable: true,
								}}
								modules={[Pagination]}
								className="testimonials-slide"
							>
								{testimonials.length > 0 &&
									testimonials.map((teste) => (
										<SwiperSlide key={teste.id}>
											<div className="single-testimonial m-30">
												<div className="testimonial-conetent">
													<p>{teste.description}</p>
												</div>

												<div className="testimonial-info d-flex align-items-center">
													<img
														className="rounded-pill me-3"
														src={teste.image_url}
														alt="testimonial"
													/>
													<h4 className="mb-0">
														{teste.name},{" "}
														<span>
															{teste.designation}
														</span>
													</h4>
												</div>
											</div>
										</SwiperSlide>
									))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
