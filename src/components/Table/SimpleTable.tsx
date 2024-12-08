"use client";

import { Button, Paper, Space, Title } from "@mantine/core";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import { useCustomTable } from "@/hooks/use-custom-table";
import useReplayStore from "@/store/replaysStore";
import { IconTrash } from "@tabler/icons-react";
import { Replay } from "@/interfaces/AllIInterfaces";
import { getUserMeLoader } from "@/Data/Service/getUserMe";


export function SimpleTable() {
  const {fetchReplay, replays,deleteReplay,loadings}=useReplayStore();

 async function getData() {
     const user=await getUserMeLoader()
     if(user !== null && user?.data !== null){
    await  fetchReplay(user.data.id)}
   }
  const columns = useMemo<MRT_ColumnDef<Replay>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "task.title",
        header: "Task Title",
         Cell: ({ row }) => {
        const title = row.original.task?.title || "No Title";
        return title.length > 5 ? `${title.substring(0, 10)}...` : title;
      },
      },
      {
        accessorKey: "task.id",
        header: "Task Id",
  
      },
      {
        accessorKey: "content",
        header: "content",     Cell: ({ row }) => {
        const title = row.original.content || "No content";
        return title.length > 5 ? `${title.substring(0, 10)}...` : title;
      },
      },
    {
      accessorKey: "action",
      header: "Action",
      Cell: ({ row }) => (
        <Button
          variant="filled"
          c="red"
          bg="red.1"
          onClick={async() => {
           await deleteReplay(row.original.id) // Set the selected task
          await getData()
         
          }}
        >
          <IconTrash/>
        </Button>

      
      ),
    },
    ],
    [],
  );

  const table = useCustomTable<Replay>({
    columns,
    state: { isLoading: loadings? true: false},
    data: replays ?? [],
  });



  useEffect(() => {

    getData()
  }, []);

  return (
    <Paper withBorder radius="md" p="md" mt="lg">
      <Title order={5}>Replays</Title>
      <Space h="md" />
      <MantineReactTable table={table} />
    </Paper>
  );
}
