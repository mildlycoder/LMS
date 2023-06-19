import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import ContactInfo from "@/components/ContactUs/ContactInfo";
import ContactForm from "@/components/ContactUs/ContactForm";

const contactUs = ({ user }) => {
	return (
		<>
			<Navbar user={user} />
			<PageBanner
				pageTitle="Contact Us"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Contact Us"
			/>

			<ContactInfo />
			<ContactForm />

			<Footer />
		</>
	);
};

export default contactUs;
