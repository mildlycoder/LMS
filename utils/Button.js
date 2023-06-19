import React from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const Button = ({ loading, disabled, btnText, btnClass }) => {
	return (
		<motion.button
			type="submit"
			className={btnClass || "default-btn"}
			disabled={disabled || false}
			whileTap={{ scale: 0.4 }}
		>
			{btnText || "Submit"}
			{loading ? <LoadingSpinner /> : ""}
		</motion.button>
	);
};

export default Button;
