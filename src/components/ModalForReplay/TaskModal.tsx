import {
	Modal,
	Button,
	TextInput,
	Textarea,
	Loader,
	NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useTaskStore from "@/store/taskStore";
import { use, useEffect, useRef } from "react";
import { ModalTaskProps } from "@/interfaces/AllIInterfaces";
import { getUserMeLoader } from "@/Data/Service/getUserMe";

export default function ModalTask({
	opened,
	close,
	taskId,
	title = "",
	content = "",
	tags = "",
}: ModalTaskProps) {
	const { loading, addTask, updateTask, fetchTasks } = useTaskStore();

	// Create a ref to store the previous task data
	const prevTaskDataRef = useRef<{
		title: string;
		content: string;
		tags: string;
	}>({
		title: "",
		content: "",
		tags: "",
	});

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			title,
			content,
			tags,
		},
	});

	// Update form values when modal is opened
	useEffect(() => {
		if (opened) {
			// Only update the form if the data has changed
			if (
				prevTaskDataRef.current.title !== title ||
				prevTaskDataRef.current.content !== content ||
				prevTaskDataRef.current.tags !== tags
			) {
				form.setValues({ title, content, tags });
				// Update the ref with the current task data
				prevTaskDataRef.current = { title, content, tags };
			}
		}
	}, [opened, title, content, tags, form]);

	const handleSave = async () => {
		const { title, content, tags } = form.getValues();
		console.log(title, content, tags);
		const user = await getUserMeLoader();
		if (taskId && user !== null && user?.data !== null) {
			// Update the task
			await updateTask(taskId, title, content, tags);
			await fetchTasks(user.data.id, 1, "", "");
		} else {
			if (user !== null && user?.data !== null) {
				// Add new task (use the current user id or a default if not available)
				await addTask(title, content, tags.trim(), user.data.id.toString());
				await fetchTasks(user.data.id, 1, "", "");
			}
		}
		close(); // Close modal after save
	};

	return (
		<Modal
			opened={opened}
			onClose={close}
			title={taskId ? "Update Task" : "Create Task"}
		>
			<form onSubmit={form.onSubmit(handleSave)}>
				<TextInput
					label="Task Title"
					placeholder="Enter task title"
					required
					{...form.getInputProps("title")}
				/>
				<Textarea
					label="Task Content"
					placeholder="Enter task content"
					required
					mt="md"
					{...form.getInputProps("content")}
				/>
				<NativeSelect
					label="Input label"
					description="Input description"
					{...form.getInputProps("tags")}
					data={["Select Tag", "React", "Next js", "Javascript"]}
				/>
				;
				<Button fullWidth mt="xl" type="submit" disabled={loading}>
					{loading ? (
						<Loader size={25} color="rgba(255, 255, 255, 1)" />
					) : taskId ? (
						"Update Task"
					) : (
						"Create Task"
					)}
				</Button>
			</form>
		</Modal>
	);
}
