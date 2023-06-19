import React from "react";
import Link from "next/link";

const InstructorProfile = ({ instructor }) => {
	const { first_name, last_name, profile_photo } = instructor;
	// console.log(instructor);
	return (
		<div className="admin-info d-flex align-items-center">
			<Link href="/instructor">
				<a>
					<img
						src={
							profile_photo
								? profile_photo
								: "/images/admin/admin-10.jpg"
						}
						alt={first_name}
					/>
				</a>
			</Link>
			<span>Created By </span>{" "}
			<Link href="/instructor">
				<a>
					{first_name} {last_name}
				</a>
			</Link>
		</div>
	);
};

export default InstructorProfile;
