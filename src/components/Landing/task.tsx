import {
	FeatureProps,
	FeaturePropsforTasks,
} from "@/interfaces/AllIInterfaces";
import { Flex, Paper, Text, ThemeIcon } from "@mantine/core";
import {
	IconBrandNodejs,
	IconBrandNextjs,
	IconBrandReact,
} from "@tabler/icons-react";

import { useRouter } from "next/navigation";

export default function Task({
	id,
	title,
	description,
	username,
	Reply,
	tags,
	date,
}: FeaturePropsforTasks) {
	let IconComponent;

	// Use switch to assign the correct icon based on the tags
	switch (tags) {
		case "Next.js":
			IconComponent = IconBrandNextjs;
			break;
		case "React":
			IconComponent = IconBrandReact;
			break;
		case "Javascript":
			IconComponent = IconBrandNodejs;
			break;
		default:
			IconComponent = IconBrandNodejs;
	}

	const dateObj = new Date(date);
	const formattedDate = dateObj.toLocaleDateString("en-GB", {
		year: "numeric",
		month: "short", // 'short' gives the abbreviated month (e.g., Oct)
		day: "numeric",
	});

	const router = useRouter(); // Initialize the useRouter hook from next/navigation

	const handleTaskClick = () => {
		router.push(`/${id}`); // Use router.push for navigation to the details page
	};
	return (
		<Paper
			shadow="md"
			onClick={handleTaskClick}
			px="lg"
			py="sm"
			radius="md"
			mb="sm"
			withBorder
		>
			<ThemeIcon variant="light" size={60} radius={60}>
				<IconComponent size="2rem" stroke={1.5} />
			</ThemeIcon>
			<Text mt="sm" mb={7} fw="600">
				{title}
			</Text>
			<Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
				{description}
			</Text>
			<Flex
				mih={50}
				gap="md"
				justify="space-between"
				align="center"
				direction="row"
				wrap="wrap"
			>
				<Text size="sm" c="green.8" p={5} fw="bold">
					{username}
				</Text>

				<Text size="sm" c="red.9">
					{Reply}
				</Text>
			</Flex>
			<Flex justify="space-between" align="center" direction="row" wrap="wrap">
				<Text size="sm" c="gray.6">
					{formattedDate}
				</Text>
			</Flex>
		</Paper>
	);
}
