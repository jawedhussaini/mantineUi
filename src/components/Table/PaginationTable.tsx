"use client";

import { Button, Flex, Paper, Space, Title } from "@mantine/core";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { useCustomTable } from "@/hooks/use-custom-table";

import useTaskStore from "@/store/taskStore";
import ModalTask from "../ModalForReplay/TaskModal";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { deleteTask } from "@/api/tasks/task";
import { Task } from "@/interfaces/AllIInterfaces";
import { getUserMeLoader } from "@/Data/Service/getUserMe";

export function PaginationTable() {
	const { tasks, fetchTasks, loading } = useTaskStore();
	const [opened, { close, open }] = useDisclosure(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	async function getData() {
		const user = await getUserMeLoader();
		if (user !== null && user?.data !== null) {
			await fetchTasks(user.data.id, 1, "", "");
		}
	}
	const columns = useMemo<MRT_ColumnDef<Task>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "title",
				header: "Title",
			},
			{
				accessorKey: "replays",
				header: "Replays",
				accessorFn: (row) => `${row?.replays?.length}`,
			},
			{
				accessorKey: "tags",
				header: "Tag",
			},
			{
				accessorKey: "action",
				header: "Action",
				Cell: ({ row }) => (
					<Flex gap="sm">
						<Button
							variant="outline"
							onClick={() => {
								setSelectedTask(row.original); // Set the selected task
								open(); // Open the modal for updating
							}}
						>
							<IconEdit />
						</Button>
						<Button
							variant="filled"
							c="red"
							bg="red.1"
							onClick={async () => {
								await deleteTask(row.original.id); // Set the selected task
								const user = await getUserMeLoader();
								if (user !== null && user?.data !== null) {
									await fetchTasks(user.data.id, 1, "", "");
								}
							}}
						>
							<IconTrash />
						</Button>
					</Flex>
				),
			},
		],
		[]
	);

	const table = useCustomTable<Task>({
		columns,
		data: tasks ?? [],
		state: { isLoading: loading ? true : false },
	});

	useEffect(() => {
		getData();
	}, []);

	// Open modal for creating a new task (no task data)
	const handleCreateNewTask = () => {
		setSelectedTask(null); // No task data for creation
		open(); // Open the modal for creating a new task
	};
	return (
		<Paper withBorder radius="md" p="md" mt="lg">
			<Title order={5}>Tasks</Title>

			{/* Button to open modal for creating a new task */}
			<Button onClick={handleCreateNewTask} color="blue" variant="outline">
				Create New Task
			</Button>

			<Space h="md" />

			<MantineReactTable table={table} />

			{/* Modal to display task details */}
			<ModalTask
				taskId={selectedTask?.id || undefined} // If no task is selected, pass undefined
				opened={opened}
				title={selectedTask?.title || ""} // Pass empty string for creating a new task
				content={selectedTask?.description || ""} // Pass empty string for creating a new task
				tags={selectedTask?.tags || ""} // Pass empty string for creating a new task
				close={close}
			/>
		</Paper>
	);
}
