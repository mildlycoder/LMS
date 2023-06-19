import React, { useState } from "react";
import Link from "next/link";
import { handleLogout } from "@/utils/auth";
import { motion } from "framer-motion";

const TopHeader = ({ user }) => {
	return (
		<motion.div
			className="top-header-area bg-color-0f6c76"
			initial={{ y: -25 }}
			animate={{ y: 0 }}
			transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
		>
			<div className="container-fluid">
				<div className="row align-items-center">
					<div className="col-lg-8">
						<div className="header-left-content">
						</div>
					</div>

					<div className="col-lg-4">
						<ul className="header-right-content">
							<li>
								<Link href="/become-an-instructor">
									<a>Become An Instructor</a>
								</Link>
							</li>
							<li className="auth-link">
								{user ? (
									<Link href="#">
										<a
											onClick={(e) => {
												e.preventDefault();
												handleLogout();
											}}
										>
											<i className="bx bx-log-out"></i>{" "}
											Sign out
										</a>
									</Link>
								) : (
									<Link href="/auth">
										<a>
											<i className="ri-arrow-right-line"></i>{" "}
											Signin
										</a>
									</Link>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default TopHeader;
