import React from "react";

const Requirements = ({ requirements }) => {
	return (
		<div>
			<div className="course-contents">
				<div
					dangerouslySetInnerHTML={{
						__html: requirements,
					}}
				></div>
			</div>
		</div>
	);
};

export default Requirements;
