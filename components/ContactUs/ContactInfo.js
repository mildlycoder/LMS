import React from "react";

const ContactInfo = () => {
	return (
		<div className="contact-info-area pt-100 pb-70">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-6">
						<div className="single-contact-info d-flex align-items-center">
							<img
								src="/images/contact-info-1.svg"
								alt="contact"
							/>

							<div>
								<h3>Call Us</h3>
								<ul>
									<li>
										<a href="tel:+009-3867-321">
											+009 3867 321
										</a>
									</li>
									<li>
										<a href="tel:+009-3867-532">
											+009 3867 532
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col-lg-4 col-md-6">
						<div className="single-contact-info bg-f3dfc1 d-flex align-items-center">
							<img
								src="/images/contact-info-2.svg"
								alt="contact"
							/>

							<div>
								<h3>mail Us</h3>
								<ul>
									<li>
										<a href="mailto:hello@edmy.com">
											hello@edmy.com
										</a>
									</li>
									<li>
										<a href="mailto:info@edmy.com">
											info@edmy.com
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="col-lg-4 col-md-6">
						<div className="single-contact-info d-flex bg-a8e3da align-items-center">
							<img
								src="/images/contact-info-3.svg"
								alt="contact"
							/>

							<div>
								<h3>Visit Us</h3>
								<p>
									Cecilia Chapman, 711-2880 Nulla St.
									Mississippi 96522
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
