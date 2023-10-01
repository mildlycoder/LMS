import React from "react";
import Link from "next/link";
import AnimatedCharacters from "@/components/Index/BannerText";
import { motion } from "framer-motion";

const PageBanner = ({
	pageTitle,
	homePageUrl,
	homePageText,
	activePageText,
}) => {
	const variants = {
		hidden: {
			scale: 0.8,
			opacity: 0,
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				delay: 0.2,
			},
		},
	};
	const pVariants = {
		hidden: {
			scale: 0.8,
			opacity: 0,
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				delay: 0.4,
			},
		},
	};

	return (
		<>
			<div className="pages-banner-area ptb-100">
				<div className="container">
					<div className="pages-banner-content">
						<motion.h2
							initial="hidden"
							animate="visible"
							variants={variants}
						>
							{activePageText}
						</motion.h2>
						<motion.ul
							initial="hidden"
							animate="visible"
							variants={pVariants}
						>
							<li>
								<Link href={homePageUrl}>
									<a>{homePageText}</a>
								</Link>
							</li>
							<li>{pageTitle}</li>
						</motion.ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageBanner;
