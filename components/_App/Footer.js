import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<>
			<div className="footer-area bg-color-f6fafb pt-100 pb-70">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget">
								<a href="index.html" className="logo">
									<img
										src="/images/logo.png"
										className="main-logo"
										alt="logo"
									/>
									<img
										src="/images/white-logo.png"
										className="white-logo"
										alt="logo"
									/>
								</a>
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Mattis mi suscipit bibendum
									sit amet, consectetur.
								</p>
							</div>
						</div>

						<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget pl-40">
								<h3>Quick Link</h3>

								<ul className="import-link">
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/courses">
											<a>Courses</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/about-us">
											<a>About Us</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/terms-conditions">
											<a>Terms & Conditions</a>
										</Link>
									</motion.li>
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget pl-40">
								<h3>Help Center</h3>

								<ul className="import-link">
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/contact-us">
											<a>Support</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/faq">
											<a>Get Help</a>
										</Link>
									</motion.li>
									<motion.li
										whileHover={{
											scale: 1.1,
											originX: 0,
											transition: { duration: 0.5 },
										}}
									>
										<Link href="/privacy-policy">
											<a>Privacy Policy</a>
										</Link>
									</motion.li>
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-sm-6">
							<div className="single-footer-widget">
								<h3>Contact Info</h3>

								<ul className="info">
									<li>
										<span>Call Us:</span>{" "}
										<a href="tel:1-885-665-2022">
											1-885-665-2022
										</a>
									</li>
									<li>
										<span>Address:</span> +7011 Vermont Ave,
										Los Angeles, CA 90044
									</li>
									<li>
										<span>Mail Us:</span>{" "}
										<a href="mailto:hello@edmy.com">
											hello@edmy.com
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<img
					src="/images/footer-shape-1.png"
					className="shape shape-1"
					alt="footer"
				/>
				<img
					src="/images/footer-shape-2.png"
					className="shape shape-2"
					alt="footer"
				/>
			</div>

			<div className="copy-right-area bg-color-f6fafb">
				<div className="container">
					<p>
						&copy; Edmy {currentYear} is Proudly Owned by{" "}
						<a href="https://hibootstrap.com/" target="_blank">
							HiBootstrap
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
