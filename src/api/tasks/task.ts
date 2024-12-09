import { getAuthToken } from "@/Data/Service/getToken";
import axios from "axios";

const STRAPI_URL =
	process.env.STRAPI_URL || "https://mantineadminpanal.onrender.com/api";

// Create a new task
export const createTask = async (
	title: string,
	description: string,
	tags: string,
	userId: string
) => {
	const token = await getAuthToken();
	try {
		const response = await axios.post(
			`${STRAPI_URL}/tasks`,
			{
				data: {
					taskField: description,
					tags: tags,
					user: userId,
					Title: title,
				},
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to create task";
		return { errors: errorMessage };
	}
};

// Get all tasks
export const getTasks = async (
	userId: string = "",
	page: number = 1,
	tagValue: string = "",
	titles: string = ""
) => {
	const token = await getAuthToken();
	try {
		const response = await axios.get(
			`${STRAPI_URL}/tasks?${
				tagValue && tagValue !== "All"
					? `[filters][tags][$eq]=${tagValue}`
					: null
			}&${titles ? `[filters][taskField][$contains]=${titles}` : null}&${
				userId ? `[filters][user][id][$eq]=${userId}` : null
			}`,
			{
				headers: {
					Authorization: `Bearer  ${token}`, // Send the token in the Authorization header
				},
				params: {
					populate: "*", // Populate all related fields
					pagination: {
						page: page,
						pageSize: 6,
					},
					sort: { createdAt: "desc" },
				},
			}
		);
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to fetch tasks";
		return { errors: errorMessage };
	}
};
export const getTasksByUser = async (userId?: string) => {
	const token = await getAuthToken();
	try {
		const url = `${STRAPI_URL}/tasks?user=${userId}`; // If userId is provided, filter tasks by user

		const response = await axios.get(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to fetch tasks";
		return { errors: errorMessage };
	}
};

// Get a specific task by ID
export const getTask = async (id: string) => {
	const token = await getAuthToken();
	try {
		const response = await axios.get(`${STRAPI_URL}/tasks/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
			params: {
				populate: "*", // Populate all related fields
			},
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to fetch task";
		return { errors: errorMessage };
	}
};

// Update a task
export const updateTask = async (
	id: string,
	title: string,
	description: string,
	tags: string
) => {
	const token = await getAuthToken();
	try {
		const response = await axios.put(
			`${STRAPI_URL}/tasks/${id}`,
			{ data: { Title: title, taskField: description, tags: tags } },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to update task";
		return { errors: errorMessage };
	}
};

// Delete a task
export const deleteTask = async (id: string) => {
	const token = await getAuthToken();
	try {
		const response = await axios.delete(`${STRAPI_URL}/tasks/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		const errorMessage =
			(error as any).response?.data?.error?.message || "Failed to delete task";
		return { errors: errorMessage };
	}
};
