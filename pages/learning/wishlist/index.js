import React, { useState, useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Link from "next/link";
import { parseCookies } from "nookies";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import CoursesList from "@/components/Courses/CoursesList";

const Index = ({ user }) => {
	const { edmy_users_token } = parseCookies();

	const [courses, setCourses] = useState([]);

	const fetchEnrol = async () => {
		const payload = { headers: { Authorization: edmy_users_token } };
		const url = `${baseUrl}/api/wishlist`;
		const response = await axios.get(url, payload);
		let courseArray = [];
		if (response) {
			response.data.courses.map((c) => {
				courseArray.push(c.course);
			});
		}
		setCourses(courseArray);
	};

	useEffect(() => {
		fetchEnrol();
	}, []);

	return (
		<>
			<Navbar user={user} />

			<div className="ptb-100">
				<div className="container">
					<h2 className="fw-bold mb-4">My learning</h2>

					<ul className="nav-style1">
						<li>
							<Link href="/learning/my-courses/">
								<a>All Courses</a>
							</Link>
						</li>
						<li>
							<Link href="/learning/wishlist/">
								<a className="active">Wishlist</a>
							</Link>
						</li>
					</ul>

					<div className="row">
						<CoursesList courses={courses} user={user} />
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;
