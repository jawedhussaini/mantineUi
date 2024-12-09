import { create } from "zustand";
import {
	createReplay,
	getReplaysByTask,
	getReplayByUserId,
	updateReplay,
	deleteReplay,
} from "../api/replays/replays";
import { ReplayState } from "@/interfaces/AllIInterfaces";

const useReplayStore = create<ReplayState>((set) => ({
	replays: [],
	replayById: null,
	loadings: false,
	error: null,
	currentPage: 1,
	totalPages: 1,

	setLoadings: (loadings: boolean) => set({ loadings }),
	setError: (error: string | null) => set({ error }),
	setCurrentPage: (page: number) => set({ currentPage: page }),

	addReplay: async (taskId: string, content: string, userId: string) => {
		set({ loadings: true, error: null });

		const newReplay = await createReplay(taskId, content, userId);

		if (!newReplay) {
			set({
				loadings: false,
				error: "failed to send replay",
			});
		}
		if (newReplay?.errors) {
			set({
				loadings: false,
				error: newReplay.error,
			});
		}
		set((state) => ({
			replays: [...state.replays, newReplay],
			loadings: false,
		}));
	},

	fetchReplays: async (
		taskId: string | undefined,
		userId: string | undefined
	) => {
		set({ loadings: true, error: null });

		const response = await getReplaysByTask(taskId, userId);
		if (!response) {
			set({
				loadings: false,
				error: "Failed to fetch replays",
			});
		}
		if (response?.errors) {
			set({
				loadings: false,
				error: response.error,
			});
		}
		const replays =
			response?.data?.map((replay: any) => ({
				id: replay.id,
				content: replay.attributes?.answer,
				task: replay.attributes?.task?.data
					? {
							id: replay.attributes?.task?.data?.id,
							title: replay.attributes?.task?.data?.attributes?.Title,
					  }
					: undefined,
				user: replay.attributes?.user?.data
					? {
							username: replay.attributes?.user?.data?.attributes?.username,
							email: replay.attributes?.user?.data?.attributes?.email,
					  }
					: undefined,
				createdAt: replay.attributes?.createdAt,
			})) || [];

		set({
			replays,
			totalPages: response?.meta?.pagination?.pageCount || 1,
			loadings: false,
		});
	},

	fetchReplay: async (id: string) => {
		set({ loadings: true, error: null });

		const replay = await getReplayByUserId(id);

		if (!replay) {
			set({
				loadings: false,
				error: "Failed to fetch replays",
			});
		}
		if (replay?.errors) {
			set({
				loadings: false,
				error: replay.error,
			});
		}
		const replays =
			replay?.data?.map((replay: any) => ({
				id: replay.id,
				content: replay.attributes?.answer,
				task: replay.attributes?.task?.data
					? {
							id: replay.attributes?.task?.data?.id,
							title: replay.attributes?.task?.data?.attributes?.Title,
					  }
					: undefined,
				user: replay.attributes?.user?.data
					? {
							username: replay.attributes?.user?.data?.attributes?.username,
							email: replay.attributes?.user?.data?.attributes?.email,
					  }
					: undefined,
				createdAt: replay.attributes?.createdAt,
			})) || [];
		set({
			replays,
			loadings: false,
		});
	},

	updateReplay: async (id: string, content: string) => {
		set({ loadings: true, error: null });

		const updatedReplay = await updateReplay(id, content);
		if (!updatedReplay) {
			set({
				loadings: false,
				error: "Failed to update replay",
			});
		}
		if (updatedReplay?.errors) {
			set({
				loadings: false,
				error: updatedReplay.error,
			});
		}
		set((state) => ({
			replays: state.replays.map((replay) =>
				replay.id === updatedReplay.id ? updatedReplay : replay
			),
			loadings: false,
		}));
	},

	deleteReplay: async (id: string) => {
		set({ loadings: true, error: null });

		const deletedReplay = await deleteReplay(id);
		if (!deleteReplay) {
			set({
				loadings: false,
				error: "Failed to delete replay",
			});
		}
		if (deletedReplay?.errors) {
			set({
				loadings: false,
				error: deletedReplay.error,
			});
		}
		set((state) => ({
			replays: state.replays.filter((replay) => replay.id !== id),
			loadings: false,
		}));
	},
}));

export default useReplayStore;
