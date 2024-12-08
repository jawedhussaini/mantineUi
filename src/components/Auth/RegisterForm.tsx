"use client";

import { register } from "@/Data/actions/authAction";

import {
	Button,
	Card,
	Checkbox,
	Group,
	PasswordInput,
	TextInput,
	Text,
	Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export function RegisterForm() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
			name: "",
			termsOfService: false,
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	const handelLogin = async (name: string, email: string, password: string) => {
		// Reset any previous errors
		setLoading(true);
		const result = await register(name, email, password);
		if (result) {
			setError(result.message);
		}
		setLoading(false);
	};
	return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<Text c="red" mt="md" mb="md">
				{error}
			</Text>

			<form
				onSubmit={form.onSubmit((values) =>
					handelLogin(values.name, values.email, values.password)
				)}
			>
				<TextInput
					required
					withAsterisk
					label="Email"
					placeholder="your@email.com"
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
				<TextInput
					required
					withAsterisk
					label="Username"
					placeholder="Jane Doe"
					mt="md"
					key={form.key("name")}
					{...form.getInputProps("name")}
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>

				<Group mt="md" justify="space-between">
					<Checkbox label="Remember me" />
				</Group>

				<Button fullWidth mt="xl" disabled={loading} type="submit">
					{loading ? <Loader size="xs" /> : "Sign Up"}
				</Button>
			</form>
		</Card>
	);
}
