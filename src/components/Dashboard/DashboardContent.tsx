"use client";

import { Flex, Grid, GridCol, Loader, Text } from "@mantine/core";

import { ProfileCard } from "./ProfileCard";

import { WelcomeCard } from "./WelcomeCard";
import Graph from "../Graph/Graph";
import { getUserMeLoader } from "@/Data/Service/getUserMe";
import useReplayStore from "@/store/replaysStore";
import useTaskStore from "@/store/taskStore";

export function DashboardContent() {
	const { fetchTasks, tasks, loading } = useTaskStore();
	const { replays, fetchReplay, loadings } = useReplayStore();

	async function getData() {
		const user = await getUserMeLoader();

		if (user !== null && user?.data !== null) {
			const { id } = user.data;

			await fetchReplay(id);
			await fetchTasks(id, 1, "", "");
		}
	}

	return (
		<Grid>
			<GridCol span={{ sm: 12, md: 12, lg: 4 }}>
				<ProfileCard />
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 8 }}>
				<Flex direction="column" h="100%" justify="space-between" gap="md">
					<WelcomeCard />
				</Flex>
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 6 }}>
				<Text size="lg" c="green" fw="bold" p="md">
					{" "}
					Tasks
				</Text>
				{loading ? (
					<Loader color="blue" m={"lg"} />
				) : (
					<Graph tasks={tasks} color="violet.6" />
				)}
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 6 }}>
				<Text size="lg" c="green" fw="bold" p="md">
					{" "}
					Replys
				</Text>
				{loadings ? (
					<Loader color="blue" m={"lg"} />
				) : (
					<Graph tasks={replays} color="violet.6" />
				)}
			</GridCol>
			<GridCol span={12}></GridCol>
		</Grid>
	);
}
