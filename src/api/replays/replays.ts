import { getAuthToken } from "@/Data/Service/getToken";
import axios from "axios";

const STRAPI_URL =
	process.env.STRAPI_URL || "https://mantineadminpanal.onrender.com/api";

// Create a new replay
export const createReplay = async (
	taskId: string,
	content: string,
	userId: string
) => {
	const token = await getAuthToken();
	try {
		const response = await axios.post(
			`${STRAPI_URL}/replays`,
			{ data: { task: taskId, answer: content, user: userId } },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message ||
			"Failed to create replay";
		return { errors: errorMessage };
	}
};

// Get all replays for a specific task
export const getReplaysByTask = async (
	taskId: string | undefined,
	userId: string | undefined
) => {
	const token = await getAuthToken();
	try {
		const response = await axios.get(`${STRAPI_URL}/replays`, {
			headers: { Authorization: `Bearer ${token}` },
			params: {
				filters: {
					task: { id: { $eq: taskId } },
					user: { id: { $eq: userId } },
				},

				populate: "*",
			},
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message ||
			"Failed to fetch replays";
		return { errors: errorMessage };
	}
};

// Get a specific replay by ID
export const getReplayByUserId = async (id: string) => {
	const token = await getAuthToken();
	try {
		const response = await axios.get(
			`${STRAPI_URL}/replays?&[filters][user][id][$eq]=${id}`,
			{
				headers: { Authorization: `Bearer ${token}` },
				params: {
					populate: "*",
				},
			}
		);
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to fetch replay";
		return { errors: errorMessage };
	}
};

// Update a replay
export const updateReplay = async (id: string, content: string) => {
	const token = await getAuthToken();
	try {
		const response = await axios.put(
			`${STRAPI_URL}/replays/${id}`,
			{ content },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message ||
			"Failed to update replay";
		return { errors: errorMessage };
	}
};

// Delete a replay
export const deleteReplay = async (id: string) => {
	const token = await getAuthToken();
	try {
		const response = await axios.delete(`${STRAPI_URL}/replays/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message ||
			"Failed to delete replay";
		return { errors: errorMessage };
	}
};
