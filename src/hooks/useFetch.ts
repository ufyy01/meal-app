import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchData = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsPending(true);
				const response = await axios.get(url);
				setData(response.data);
				setError(null);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				setError(error.message);
			} finally {
				setIsPending(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, error, isPending };
};
