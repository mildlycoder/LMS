import React, { useState } from "react";
import { useRouter } from "next/router";

const SearchForm = ({ formClass, btnClass = null, banner = false }) => {
	const [search, setSearch] = useState("");
	const router = useRouter();

	const handleSearch = (e) => {
		e.preventDefault();
		const query = router.query;
		router.push({
			pathname: "/courses",
			query: { ...query, search: search },
		});
	};
	return (
		<form className={formClass} onSubmit={handleSearch}>
			<input
				type="text"
				className="form-control"
				placeholder="Search Courses"
				name="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type="submit" className={btnClass}>
				{banner === true && <span>Search Now</span>}
				<i className="ri-search-line"></i>
			</button>
		</form>
	);
};

export default SearchForm;
