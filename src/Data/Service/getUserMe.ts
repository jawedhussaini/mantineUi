import { getAuthToken } from "./getToken";
import axios from "axios";

export async function getUserMeLoader() {
	const STRAPI_URL =
		process.env.STRAPI_URL || "https://mantineadminpanal.onrender.com/api";

	const token = await getAuthToken();
	if (!token) return { ok: false, data: null, error: null };

	if (!token) return { ok: false, data: null, error: null };
	if (token) {
		try {
			const response = await axios.get(`${STRAPI_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.data.error)
				return { ok: false, data: null, error: response.data.error };
			return { ok: true, data: response.data, error: null };
		} catch (error) {
			throw new Error("Authentication failed");
		}
	}
	return null;
}
