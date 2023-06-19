import React, { useState } from "react";
import Link from "next/link";
import CoursesDetailsSidebar from "./CoursesDetailsSidebar";
import WhatYouWillLearn from "../Course/WhatYouWillLearn";
import InstructorProfile from "../Course/InstructorProfile";
import { formatDate } from "@/utils/helper";
import TabContent from "./TabContent";

const CoursesDetailsContent = ({ user: current_user, course }) => {
	const {
		title,
		slug,
		overview,
		what_you_will_learn,
		who_is_this_course_for,
		requirements,
		is_class,
		updated_at,
		category,
		user,
		enrolments,
	} = course;

	return (
		<div className="course-details-area ptb-100">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="course-details-content">
							<h2 className="title">{title}</h2>
							<ul className="best-seller">
								{category && (
									<li>
										<Link
											href={`/category/${category.slug}`}
										>
											<a>{category.name}</a>
										</Link>
									</li>
								)}
								<li>
									<span>
										{enrolments && enrolments.length}
									</span>{" "}
									Students
								</li>
								<li>
									Last Updated{" "}
									<span>{formatDate(updated_at)}</span>
								</li>
							</ul>

							<div className="gap-mb-30"></div>

							{user && <InstructorProfile instructor={user} />}

							<div className="gap-mb-30"></div>

							<WhatYouWillLearn
								what_you_will_learn={what_you_will_learn}
							/>

							<div className="gap-mb-50"></div>

							<TabContent
								overview={overview}
								courseSlug={slug}
								requirements={requirements}
								instructor={user}
								who_is_this_course_for={who_is_this_course_for}
								is_class={is_class}
							/>
						</div>
					</div>

					<CoursesDetailsSidebar
						current_user={current_user}
						course={course}
					/>
				</div>
			</div>
		</div>
	);
};

export default CoursesDetailsContent;
