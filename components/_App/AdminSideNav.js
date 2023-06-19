import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import StickyBox from "react-sticky-box";
import { motion } from "framer-motion";

const AdminSideNav = ({ user }) => {
	const isAdmin = user.role === "admin";
	const router = useRouter();
	const currentRoute = router.pathname;

	useEffect(() => {
		if (!isAdmin) {
			router.replace("/");
		}
	}, [user]);

	// Sidebar Nav
	const [isActiveSidebarNav, setActiveSidebarNav] = useState("false");
	const handleToggleSidebarNav = () => {
		setActiveSidebarNav(!isActiveSidebarNav);
	};

	return (
		<>
			{/* For mobile device */}
			<div className="text-end d-md-none">
				<div
					className="sidebar-menu-button"
					onClick={handleToggleSidebarNav}
				>
					Sidebar Menu
				</div>
			</div>

			<div
				className={`side-nav-wrapper ${
					isActiveSidebarNav ? "" : "active"
				}`}
			>
				<StickyBox
					className="sticky-box"
					offsetTop={50}
					offsetBottom={20}
				>
					{/* Close button */}
					<div
						className="close d-md-none"
						onClick={handleToggleSidebarNav}
					>
						<i className="bx bx-x"></i>
					</div>

					{/* Nav */}
					<div className="side-nav">
						<ul>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/">
									<a
										className={
											currentRoute === "/admin"
												? "active"
												: ""
										}
									>
										Dashboard
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/courses/">
									<a
										className={
											currentRoute === "/admin/courses"
												? "active"
												: ""
										}
									>
										Courses
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/instructor/">
									<a
										className={
											currentRoute === "/admin/instructor"
												? "active"
												: ""
										}
									>
										Instructors
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/students/">
									<a
										className={
											currentRoute === "/admin/students"
												? "active"
												: ""
										}
									>
										Students
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/partners/">
									<a
										className={
											currentRoute === "/admin/partners"
												? "active"
												: ""
										}
									>
										Partners
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/testimonials/">
									<a
										className={
											currentRoute ===
											"/admin/testimonials"
												? "active"
												: ""
										}
									>
										Testimonials
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/categories/">
									<a
										className={
											currentRoute === "/admin/categories"
												? "active"
												: ""
										}
									>
										Categories
									</a>
								</Link>
							</motion.li>
							<motion.li
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{ scale: 0.9 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 10,
								}}
							>
								<Link href="/admin/coupons/">
									<a
										className={
											currentRoute === "/admin/coupons" ||
											currentRoute ===
												"/admin/coupons/create"
												? "active"
												: ""
										}
									>
										Coupons
									</a>
								</Link>
							</motion.li>
						</ul>
					</div>
				</StickyBox>
			</div>
		</>
	);
};

export default AdminSideNav;
