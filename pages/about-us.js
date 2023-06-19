import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import Features from "@/components/Index/Features";
import Testimonials from "@/components/Index/Testimonials";
import Business from "@/components/Index/Business";
import Link from "next/link";

const aboutUs = ({ user }) => {
	return (
		<>
			<Navbar user={user} />
			<PageBanner
				pageTitle="About Us"
				homePageUrl="/"
				homePageText="Home"
				activePageText="About Us"
			/>

			<div className="transform-area ptb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="transform-conetnt">
								<h2>
									We Are <span>Edmy!</span> The Best Online
									Learning Platform
								</h2>
								<p>
									Instructors from around the world teach
									millions of students on Edmy. We provide the
									tools and skills to teach what you love. And
									you can also achieve your goal.
								</p>

								<div className="single-transform d-flex align-items-center">
									<div className="transform-video-img flex-shrink-0">
										<img
											src="/images/courses/course-16.jpg"
											alt="about"
										/>
										<Link href="/learning/my-courses">
											<a className="video-btns popup-youtube">
												<i className="ri-play-circle-fill"></i>
											</a>
										</Link>
									</div>

									<div className="transform-video-content flex-grow-1">
										<h3>
											<Link href="/learning/my-courses">
												<a className="popup-youtube">
													Watch Video From the
													Community How Edmy Change
													Their Life
												</a>
											</Link>
										</h3>
										<ul>
											<li>My Courses</li>
										</ul>
									</div>
								</div>

								<Link href="/courses">
									<a className="default-btn">Find Out How</a>
								</Link>
							</div>
						</div>

						<div className="col-lg-6 wow animate__animated animate__fadeInRight delay-0-2s">
							<div className="transform-img wow animate__animated animate__fadeInRight delay-0-8s">
								<img
									src="/images/transform-img-2.png"
									alt="about"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Features />

			<Testimonials />

			<Business />

			<Footer />
		</>
	);
};

export default aboutUs;
