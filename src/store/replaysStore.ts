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
		try {
			const newReplay = await createReplay(taskId, content, userId);
			set((state) => ({
				replays: [...state.replays, newReplay],
				loadings: false,
			}));
		} catch (error) {
			set({ loadings: false, error: (error as Error).message });
		}
	},

	fetchReplays: async (
		taskId: string | undefined,
		userId: string | undefined
	) => {
		set({ loadings: true, error: null });
		try {
			const response = await getReplaysByTask(taskId, userId);
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
		} catch (error) {
			set({ loadings: false, error: (error as Error).message });
		}
	},

	fetchReplay: async (id: string) => {
		set({ loadings: true, error: null });
		try {
			const replay = await getReplayByUserId(id);
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
		} catch (error) {
			set({ loadings: false, error: (error as Error).message });
		}
	},

	updateReplay: async (id: string, content: string) => {
		set({ loadings: true, error: null });
		try {
			const updatedReplay = await updateReplay(id, content);
			set((state) => ({
				replays: state.replays.map((replay) =>
					replay.id === updatedReplay.id ? updatedReplay : replay
				),
				loadings: false,
			}));
		} catch (error) {
			set({ loadings: false, error: (error as Error).message });
		}
	},

	deleteReplay: async (id: string) => {
		set({ loadings: true, error: null });
		try {
			await deleteReplay(id);
			set((state) => ({
				replays: state.replays.filter((replay) => replay.id !== id),
				loadings: false,
			}));
		} catch (error) {
			set({ loadings: false, error: (error as Error).message });
		}
	},
}));

export default useReplayStore;
