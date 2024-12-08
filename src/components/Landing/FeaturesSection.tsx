"use client";

import {
	Container,
	Flex,
	Loader,
	Pagination,
	SimpleGrid,
	Space,
	Text,
	Title,
} from "@mantine/core";
import {
	IconBrandMantine,
	IconBrandNextjs,
	IconBrandOauth,
	IconBrandPlanetscale,
	IconBrandReact,
} from "@tabler/icons-react";
import classes from "./FeatureSection.module.css";
import useTaskStore from "@/store/taskStore";
import { useEffect } from "react";
import Task from "./task";
import DropDown from "../DropDown/DropDown";
import SearchInput from "../SearchInput/SearchInput";

export const featuresData = [
	{
		icon: IconBrandNextjs,
		title: "Next.js",
		description: "App dir, Routing, Layouts, Loading UI and API routes.",
	},
	{
		icon: IconBrandReact,
		title: "React 18",
		description: "Server and Client Components. Use hook.",
	},
	{
		icon: IconBrandPlanetscale,
		title: "Database",
		description: "ORM using Prisma and deployed on PlanetScale.",
	},
	{
		icon: IconBrandMantine,
		title: "Components",
		description: "UI components built using Mantine UI.",
	},
	{
		icon: IconBrandOauth,
		title: "Authentication",
		description: "Authentication using NextAuth.js and middlewares.",
	},
];

interface FeaturesGridProps {
	title: React.ReactNode;
	description: React.ReactNode;
}

export function FeaturesSection({
	title,
	description,
}: FeaturesGridProps): any {
	const {
		fetchTasks,
		tasks,
		currentPage,
		totalPages,
		setCurrentPage,
		tags,
		setTags,
		titles,
		setTitle,
		error,
		loading,
	} = useTaskStore();

	useEffect(() => {
		fetchTasks();
	}, []);

	useEffect(() => {
		fetchTasks(undefined, 1, tags, titles);
	}, [tags, titles]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		fetchTasks(undefined, page); // Fetch tasks for the selected page
	};

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.title}>{title}</Title>
			<Space h="md" />

			<Container size={560} p={0}>
				<Text size="sm" className={classes.description}>
					{description}
				</Text>
				<Text size="sm" c="red">
					{error}
				</Text>
			</Container>

			<Flex
				mih={50}
				gap="md"
				justify="space-between"
				align="center"
				direction="row"
				wrap="wrap"
				mt="lg"
			>
				<DropDown
					placeholder="Pick By Tag"
					data={["All", "Next js", "React", "Pyton", "Javascript"]}
					value={tags}
					setvalue={setTags}
				/>

				<SearchInput setvalue={setTitle} value={titles} placeholder="title" />
			</Flex>

			{loading ? (
				<Loader color="blue" mt={"lg"} mb={"lg"} />
			) : (
				<SimpleGrid
					mt={60}
					cols={{ base: 1, sm: 1, lg: 2 }}
					spacing={{ base: "lg", md: "lg", lg: "xl" }}
				>
					{tasks?.map((task: any) => {
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
					})}
				</SimpleGrid>
			)}
			<Pagination
				total={totalPages} // Set the total pages for pagination
				value={currentPage} // Current page number
				onChange={handlePageChange} // Handle page change
				mt="sm"
			/>
		</Container>
	);
}
