import React from "react";

const WhoIsThisCourseFor = ({ who_is_this_course_for }) => {
	return (
		<div>
			<div className="curriculum-content">
				<div
					dangerouslySetInnerHTML={{ __html: who_is_this_course_for }}
				></div>
			</div>
		</div>
	);
};

export default WhoIsThisCourseFor;
