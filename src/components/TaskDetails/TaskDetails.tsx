"use client";
import useTaskStore from "@/store/taskStore";
import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	Container,
	Grid,
	Flex,
	Loader,
} from "@mantine/core";
import { useEffect } from "react";
import Reply from "./Replyas";
import Task from "../Landing/task";
import { useDisclosure } from "@mantine/hooks";
import ModalReplay from "../ModalForReplay/ModalReplay";
import useReplayStore from "@/store/replaysStore";
import { TaskDetailsPropsX } from "@/interfaces/AllIInterfaces";

export default function TaskDetailsCom({ id }: TaskDetailsPropsX) {
	const { fetchTask, fetchTasks, tasks, taskById, loading } = useTaskStore();
	const { fetchReplays, replays, loadings } = useReplayStore();
	const [opened, { close, open }] = useDisclosure(false);

	useEffect(() => {
		// Fetch task details when the component mounts
		if (id) {
			fetchTask(id);
			fetchReplays(id, undefined);
		}
	}, [id, fetchTask]);

	useEffect(() => {
		const userId = taskById?.user?.id ? taskById?.user?.id : undefined;
		fetchTasks(userId, 1, "", "");
	}, [taskById]);

	return (
		<Grid p="lg">
			<Grid.Col
				p="lg"
				span={{ base: 12, md: 3, lg: 3 }}
				order={{ base: 2, sm: 1, lg: 1 }}
			>
				<Flex direction="column">
					<Text fw="bold" c="dark.4" m="md">
						Tasks By Same Author
					</Text>
					{loading ? (
						<Loader color="blue" mt={"lg"} mb={"lg"} />
					) : (
						tasks?.map((task: any) => {
							return (
								<Task
									key={task.id} // Make sure to use a unique key for each task
									title={task.title}
									description={task.description}
									username={task.user.username}
									Reply={task.replays.length}
									tags={task.tags}
									date={task.createdAt}
									id={task.id} // Add createdAt here}
								/>
							);
						})
					)}
				</Flex>
			</Grid.Col>
			<Grid.Col
				p="lg"
				span={{ base: 12, md: 9, lg: 9 }}
				order={{ base: 1, sm: 2, lg: 2 }}
			>
				<Card shadow="sm" radius="md" withBorder>
					<Text fw="bold" c="dark.3">
						{loading ? (
							<Loader size="xs" color="blue" mt={"lg"} mb={"lg"} />
						) : (
							taskById?.createdAt.slice(0, 10)
						)}
					</Text>
					<Group justify="space-between" mt="md" mb="xs">
						<Text fw={500}>
							{loading ? (
								<Loader size="xs" color="blue" mt={"lg"} mb={"lg"} />
							) : (
								taskById?.title
							)}{" "}
						</Text>
						<Badge color="pink">
							{loading ? (
								<Loader size="xs" color="blue" mt={"lg"} mb={"lg"} />
							) : (
								taskById?.user?.username
							)}
						</Badge>
					</Group>

					<Text size="sm" c="dimmed">
						{loading ? (
							<Loader size="xs" color="blue" mt={"lg"} mb={"lg"} />
						) : (
							taskById?.description
						)}
					</Text>
					<ModalReplay opened={opened} id={taskById?.id} close={close} />

					<Button onClick={open} color="blue" mt="md" radius="md">
						Replay
					</Button>
				</Card>

				<Text fw="bold" c="dark.4" m="md">
					Replies
				</Text>

				{loadings ? (
					<Loader color="blue" mt={"lg"} mb={"lg"} />
				) : (
					replays?.map((replay: any) => {
						return (
							<Reply
								key={replay?.createdAt}
								Name={replay?.user?.username}
								Email={replay?.user?.email}
								answer={replay?.content}
							/>
						);
					})
				)}
			</Grid.Col>
		</Grid>
	);
}
