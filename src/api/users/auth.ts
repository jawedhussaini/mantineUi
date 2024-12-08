import axios from "axios";
import Cookie from "js-cookie";
const STRAPI_URL =
	process.env.STRAPI_URL || "https://mantineadminpanal.onrender.com/api";

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await axios.post(`${STRAPI_URL}/auth/local`, {
			identifier: email,
			password,
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Login failed";
		return { errors: errorMessage };
	}
};

export const logoutUser = () => {};

export const checkAuth = async () => {
	const token = Cookie.get("jwt");
	if (token) {
		try {
			const response = await axios.get(`${STRAPI_URL}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			throw new Error("Authentication failed");
		}
	}
	return null;
};
export const registerUser = async (
	username: string,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post(`${STRAPI_URL}/auth/local/register`, {
			username,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Login failed";
		return { errors: errorMessage };
	}
};
