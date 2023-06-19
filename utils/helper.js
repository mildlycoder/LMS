export const alreadyFav = (userFavs, courseId) => {
	userFavs.find((crId) => {
		return crId.courseId == courseId;
	});
};

export const secondsToHms = (d) => {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor((d % 3600) / 60);
	var s = Math.floor((d % 3600) % 60);

	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return hDisplay + mDisplay + sDisplay;
};

export const progress = (finished, total) => {
	return Math.round((finished / total) * 100);
};

export const formatDate = (date) => {
	return new Date(date).toLocaleDateString("en-US");
};

export const calculateDiscount = (discount, listPrice) => {
	let beforeDiscount = parseFloat(parseFloat(listPrice).toFixed(2));
	let discountAmount = parseFloat(
		((beforeDiscount * discount) / 100).toFixed(2)
	);
	let afterDiscount = beforeDiscount - discountAmount;
	// return { afterDiscount, beforeDiscount, discountAmount, discount };
	return afterDiscount.toFixed(2);
};
