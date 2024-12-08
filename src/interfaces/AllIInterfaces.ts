import { User } from "../types/users";
export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	currentUser: User | null; // Add currentUser state
	setUser: (userData: User) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	logout: () => void;
	login: (
		email: string,
		password: string,
		callback: () => void
	) => Promise<void>;
	logoutUser: () => void;
	checkAuth: () => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string,
		callback: () => void
	) => Promise<void>;
	fetchCurrentUser: () => Promise<void>; // Add fetchCurrentUser function
}

export interface Replay {
	id: string;
	content: string;
	task?: {
		id: string;
		title: string;
	};
	user?: {
		username: string;
		email: string;
	};
	createdAt: string;
}

export interface ReplayState {
	replays: Replay[];
	replayById: Replay | null;
	loadings: boolean;
	error: string | null;
	currentPage: number;
	totalPages: number;
	addReplay: (taskId: string, content: string, userId: string) => Promise<void>;
	fetchReplays: (
		taskId: string | undefined,
		userId: string | undefined
	) => Promise<void>;
	fetchReplay: (id: string) => Promise<void>;
	updateReplay: (id: string, content: string) => Promise<void>;
	deleteReplay: (id: string) => Promise<void>;
	setLoadings: (loadings: boolean) => void;
	setError: (error: string | null) => void;
	setCurrentPage: (page: number) => void;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	user?: {
		id: string;
		username: string;
	};
	replays?: any[];
	tags?: string;
}

export interface TaskState {
	tasks: Task[];
	taskById: Task | null;
	loading: boolean;
	error: string | null;
	totalPages: number; // To track the total number of pages
	currentPage: number; // Current page number
	tags: string | "";
	titles: string | "";

	addTask: (
		title: string,
		description: string,
		tags: string,
		userId: string
	) => Promise<void>;
	fetchTasks: (
		userId?: string,
		page?: number,
		tagValue?: string,
		titles?: string
	) => Promise<void>;
	fetchTask: (id: string) => Promise<void>;
	updateTask: (
		id: string,
		title: string,
		description: string,
		tags: string
	) => Promise<void>;
	deleteTask: (id: string) => Promise<void>;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	setCurrentPage: (page: number) => void; // Set current page
	setTags: (tag: string) => void;
	setTitle: (taskTitle: string) => void;
}

export interface TaskDetailsProps {
	params: {
		id: string;
	};
}

export interface FeatureProps {
	setvalue: (value: string) => void;
	value: string | "";
	placeholder: string;
	data: string[];
}

export interface Props {
	burger?: React.ReactNode;
}

export interface FeaturePropsforTasks {
	title: React.ReactNode;
	description: React.ReactNode;
	username: React.ReactNode;
	Reply: React.ReactNode;
	tags: React.ReactNode;
	date: string;
	id: string;
}

export interface ModalTaskProps {
	opened: boolean;
	close: () => void;
	taskId?: string;
	title?: string;
	content?: string;
	tags?: string;
}

export interface LinksGroupProps {
	icon: React.FC<any>;
	label: string;
	link?: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string }[];
}

export interface FeaturePropsSearch {
	setvalue: (value: string) => void;
	value: string | "";
	placeholder: string;
}
export interface TaskDetailsPropsss {
	Name: string;
	Email: string;
	answer: string;
}

export interface TaskDetailsPropsX {
	id: string;
}
