import { create } from "zustand";
import {
	createTask,
	getTasks,
	getTasksByUser,
	updateTask,
	deleteTask,
	getTask,
} from "../api/tasks/task";
import { any } from "zod";
import { TaskState } from "@/interfaces/AllIInterfaces";

const useTaskStore = create<TaskState>((set) => ({
	tasks: [],
	taskById: null,
	loading: false,
	error: null,
	totalPages: 1,
	currentPage: 1,
	tags: "",
	titles: "",
	setLoading: (loading: boolean) => set({ loading }),
	setError: (error: string | null) => set({ error }),
	setCurrentPage: (page: number) => set({ currentPage: page }),
	setTags: (tags: string) => set({ tags: tags }),
	setTitle: (taskTitle: string) => set({ titles: taskTitle }),

	// Add a new task
	addTask: async (
		title: string,
		description: string,
		tags: string,
		userId: string
	) => {
		set({ loading: true, error: null });
		try {
			const newTask = await createTask(title, description, tags, userId);
			set((state) => ({
				tasks: [...state.tasks, newTask],
				loading: false,
			}));
		} catch (error) {
			set({
				loading: false,
				error: (error as Error).message,
			});
		}
	},

	// Fetch all tasks, or fetch tasks by user ID
	fetchTasks: async (
		userId?: string,
		page = 1,
		tagValue?: string,
		titles?: string
	) => {
		set({ loading: true, error: null });
		try {
			const response = await getTasks(userId, page, tagValue, titles);
			const tasks =
				response?.data?.map((task: any) => ({
					id: task.id,
					title: task.attributes?.Title,
					description: task.attributes?.taskField,
					user: task.attributes?.user?.data
						? {
								id: task.attributes?.user?.data?.id,
								username: task.attributes?.user?.data?.attributes?.username,
						  }
						: undefined,
					replays: task.attributes?.replays?.data || [],
					tags: task.attributes?.tags,
					createdAt: task.attributes?.createdAt, // Add createdAt here
				})) || [];

			set({
				tasks,
				totalPages: response?.meta?.pagination?.pageCount || 1, // Assuming the API returns pagination info
				loading: false,
			});
		} catch (error) {
			set({
				loading: false,
				error: (error as Error).message,
			});
		}
	},

	// Fetch a single task by ID
	fetchTask: async (id: string) => {
		set({ loading: true, error: null });
		try {
			const task = await getTask(id);

			const taskById = {
				id: task.data.id,
				title: task.data.attributes?.Title,
				description: task.data.attributes?.taskField,
				user: task.data.attributes?.user?.data
					? {
							id: task.data.attributes?.user?.data?.id,
							username: task.data.attributes?.user?.data?.attributes?.username,
					  }
					: undefined,
				replays: task.data.attributes?.replays?.data || [],
				tags: task.data.attributes?.tags,
				createdAt: task.data.attributes?.createdAt,
			};
			set({
				taskById,
				loading: false,
			});
		} catch (error) {
			set({
				loading: false,
				error: (error as Error).message,
			});
		}
	},

	// Update a task
	updateTask: async (
		id: string,
		title: string,
		description: string,
		tags: string
	) => {
		set({ loading: true, error: null });
		try {
			const updatedTask = await updateTask(id, title, description, tags);
			set((state) => ({
				tasks: state.tasks.map((task) =>
					task.id === updatedTask.id ? updatedTask : task
				),
				loading: false,
			}));
		} catch (error) {
			set({
				loading: false,
				error: (error as Error).message,
			});
		}
	},

	// Delete a task
	deleteTask: async (id: string) => {
		set({ loading: true, error: null });
		try {
			await deleteTask(id);
			set((state) => ({
				tasks: state.tasks.filter((task) => task.id !== id),
				loading: false,
			}));
		} catch (error) {
			set({
				loading: false,
				error: (error as Error).message,
			});
		}
	},
}));

export default useTaskStore;
