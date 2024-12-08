import { useDisclosure, useCounter } from "@mantine/hooks";
import {
	Modal,
	Button,
	Group,
	Text,
	Badge,
	Checkbox,
	Anchor,
	Loader,
	TextInput,
	Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useTaskStore from "@/store/taskStore";
import useReplayStore from "@/store/replaysStore";

import { getUserMeLoader } from "@/Data/Service/getUserMe";

export default function ModalReplay({ opened, close, id }: any) {
	const { loading, fetchTasks } = useTaskStore();
	const { addReplay, fetchReplays } = useReplayStore();
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			text: "",
			termsOfService: false,
		},
	});

	const handelClick = async (answer?: string) => {
		const user = await getUserMeLoader();
		if (user !== null && answer !== undefined) {
			addReplay(id, answer, user.data.id.toString());
			fetchReplays(id, undefined);
			form.reset();
			close(); // Close modal after save
		}
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Replay">
				<form onSubmit={form.onSubmit((values) => handelClick(values.text))}>
					<Textarea
						variant="filled"
						size="xs"
						radius="xs"
						resize="vertical"
						label="Input label"
						description="Input description"
						placeholder="Input placeholder"
						required
						key={form.key("text")}
						{...form.getInputProps("text")}
					/>

					<Button fullWidth mt="xl" type="submit">
						{loading ? (
							<Loader size={25} color="rgba(255, 255, 255, 1)" />
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</Modal>
		</>
	);
}
