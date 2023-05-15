import React, { useState, useEffect } from "react";

function useMountStatus() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500);

		return () => clearTimeout(timeout);
	}, []);

	return isMounted;
}

export default useMountStatus;
