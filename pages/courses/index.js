import React, { useState, useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CoursesList from "@/components/Courses/CoursesList";
import Footer from "@/components/_App/Footer";
import SearchForm from "@/components/_App/SearchForm";
import FilterDropdown from "@/components/Courses/FilterDropdown";
import { useRouter } from "next/router";
import Pagination from "@etchteam/next-pagination";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

export default function CoursesPage({ user }) {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(0);
	const [coursesCount, setCoursesCount] = useState(0);
	const router = useRouter();
	const page = router.query.page ? router.query.page : "1";
	const size = router.query.size ? router.query.size : "8";
	const short = router.query.short ? router.query.short : "";
	const search = router.query.search ? router.query.search : "";

	const fetchCourses = async () => {
		setLoading(true);

		const payload = {
			params: {
				page,
				limit: size,
				short: short,
				search: search,
			},
		};
		const response = await axios.get(`${baseUrl}/api/all-courses`, payload);
		setCourses(response.data.courses);
		setPages(response.data.totalPages);
		setCoursesCount(response.data.coursesCount);
		// console.log(response.data);
		setLoading(false);
	};
	useEffect(() => {
		fetchCourses();
	}, [page, size, short, search]);

	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Courses"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Courses"
			/>

			<div className="courses-area ptb-100">
				<div className="container">
					<div className="section-title wow animate__animated animate__fadeInUp delay-0-2s">
						<span className="top-title">Courses</span>
						<h2>Expand Your Career Opportunity With Our Courses</h2>
					</div>

					<div className="search-result">
						<div className="row align-items-center">
							<div className="col-lg-6 col-md-5">
								<p>
									We found <span>{coursesCount}</span> courses
									available for you
								</p>
							</div>
							<div className="col-lg-6 col-md-7">
								<ul>
									<li>
										<SearchForm
											formClass="src-form"
											btnClass="src-btn"
										/>
									</li>
									<FilterDropdown />
								</ul>
							</div>
						</div>
					</div>

					{courses && <CoursesList courses={courses} user={user} />}
					{coursesCount > 9 && (
						<div className="col-lg-12 col-md-12">
							<div className="pagination-area text-center">
								<Pagination sizes={[1]} total={pages} />
							</div>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
}
