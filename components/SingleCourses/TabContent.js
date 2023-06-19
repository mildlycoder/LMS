import React, { useState } from "react";
import CourseOverview from "../Learning/CourseOverview";
import Requirements from "../Course/Requirements";
import WhoIsThisCourseFor from "../Course/WhoIsThisCourseFor";
import CourseVideo from "../Course/CourseVideo";

const TabContent = ({
	overview,
	courseSlug,
	requirements,
	is_class,
	instructor,
	who_is_this_course_for,
}) => {
	const [tab, setTab] = useState("overview");
	return (
		<>
			<ul className="course-tab nav nav-tabs justify-content-between">
				<li className="nav-item">
					<button
						className={`nav-link ${
							tab == "overview" ? "active" : ""
						}`}
						onClick={() => setTab("overview")}
					>
						Overview
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link ${
							tab == "requirements" ? "active" : ""
						}`}
						onClick={() => setTab("requirements")}
					>
						Requirements
					</button>
				</li>
				<li className="nav-item">
					<button
						className={`nav-link ${tab == "witcf" ? "active" : ""}`}
						onClick={() => setTab("witcf")}
					>
						Who Is This Course For
					</button>
				</li>
			</ul>

			<div className="tab-content">
				{tab === "overview" && <CourseOverview overview={overview} />}
				{!is_class && (
					<>
						{tab === "overview" && (
							<CourseVideo courseSlug={courseSlug} />
						)}
					</>
				)}
				{tab === "requirements" && (
					<Requirements requirements={requirements} />
				)}
				{tab === "witcf" && (
					<WhoIsThisCourseFor
						who_is_this_course_for={who_is_this_course_for}
					/>
				)}
			</div>
		</>
	);
};

export default TabContent;
