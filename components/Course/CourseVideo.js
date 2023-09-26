import baseUrl from "@/utils/baseUrl";
import { secondsToHms } from "@/utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";

const CourseVideo = ({ courseSlug }) => {
	console.log(courseSlug);
	const [videos, setVideos] = useState([]);
	const [preview, setPreview] = useState("");
	const [toggler, setToggler] = useState(false);
	useEffect(() => {
		const fetchVideos = async () => {
			
			const url = `${baseUrl}/api/learnings/videos/${courseSlug}`;
			console.log(url)
			const response = await axios.get(url);
			setVideos(response.data.videos);
		};
		fetchVideos();
	}, [courseSlug]);
	console.log(videos)
	return (
		<>
			<div className="courses-curriculum">
				<ul>
					{videos &&
						videos.map((v) => (
							<li key={v.id}>
								<div className="d-flex justify-content-between align-items-center">
									<span className="courses-name">
										{v.title}
									</span>
									<div className="courses-meta">
										<span className="duration">
											{secondsToHms(v.video_length)}
										</span>
										{v.is_preview ? (
											<div></div>
										) : (
											<span
												className="status locked"
												title="Premium"
											>
												<i className="flaticon-password"></i>
											</span>
										)}
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>

			{preview && <FsLightbox toggler={toggler} sources={[preview]} />}
		</>
	);
};

export default CourseVideo;
