"use client";

import { getUserMeLoader } from "@/Data/Service/getUserMe";
import {
	Avatar,
	Card,
	Flex,
	Group,
	Space,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useTaskStore from "@/store/taskStore";
import useReplayStore from "@/store/replaysStore";

const sectionStyle = {
	padding: "var(--mantine-spacing-md)",
	borderTop:
		"1px solid lightdark(var(--mantine-colors-gray-3), var(--mantine-colors-dark-4))",
};

interface ProfileCardProps {
	name: string;
	email: string;
}

export function ProfileCard() {
	const [userData, setUserData] = useState<ProfileCardProps>({
		name: "",
		email: "",
	});

	const { fetchTasks, tasks } = useTaskStore();
	const { replays, fetchReplay } = useReplayStore();

	async function getData() {
		const user = await getUserMeLoader();

		if (user !== null && user?.data !== null) {
			const { username, email, id } = user.data;
			setUserData({ name: username, email });

			await fetchReplay(id);
			await fetchTasks(id, 1, "", "");
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<Card radius="md">
			<Card.Section style={sectionStyle}>
				<Group justify="space-between">
					<Avatar radius="xl" />
				</Group>

				<Space h="md" />

				<Flex direction="column">
					{/* Dynamically display user name */}
					<Title order={5}>{userData.name || "Loading..."}</Title>
					<Space h="xs" />
					{/* Dynamically display user email */}
					<Text fz="sm" c="dimmed" fw="500">
						{userData.email || "Loading..."}
					</Text>
					<Space h="4" />
					{/* Display wallet or additional info */}
					<Text fz="sm" c="dimmed" fw="500">
						{`${"0x3D2f3bA6737C6999850E0c0Fe571190E6d27C40C".slice(
							0,
							12
						)}..${"0x3D2f3bA6737C6999850E0c0Fe571190E6d27C40C".slice(-4)}`}
					</Text>
				</Flex>
			</Card.Section>

			<Card.Section style={sectionStyle}>
				<Group grow>
					<Stack gap={4}>
						<Text fz="sm" fw="500">
							Total Tasks
						</Text>
						<Title c="green" order={3}>
							{tasks.length}
						</Title>
					</Stack>
					<Stack gap={4}>
						<Text fz="sm" fw="500">
							Total Replays
						</Text>
						<Title c="green" order={3}>
							{replays.length}
						</Title>
					</Stack>
				</Group>
			</Card.Section>
		</Card>
	);
}
