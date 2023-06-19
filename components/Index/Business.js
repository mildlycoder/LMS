import React from "react";
import Link from "next/link";

function Business() {
	return (
		<div className="business-area pb-100">
			<div className="container">
				<div className="business-bg rounded bg-color-f2f0ef ptb-100">
					<div className="row align-items-center">
						<div className="col-lg-7">
							<div className="business-img">
								<img
									src="/images/business-img.png"
									alt="business"
								/>
							</div>
						</div>

						<div className="col-lg-5">
							<div className="business-content">
								<h2>
									Be A Member Of Edmy Business & Start Earning
									Limitless Today
								</h2>
								<p>
									Instructors from around the world teach
									millions of students on Edmy. We provide the
									tools and skills to teach what you love. And
									you can also achieve your goal with us.
								</p>

								<Link href="/become-an-instructor">
									<a className="default-btn">
										Get Edmy Business
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Business;
