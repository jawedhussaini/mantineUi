"use client";

import { useState } from "react";
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
import "highlight.js/styles/atom-one-dark.css"; // You can choose any style you prefer
import { login } from "@/Data/actions/authAction";
import Link from "next/link";

export function LoginForm() {
	// State to store the error message
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
			termsOfService: false,
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	const handelLogin = async (email: string, password: string) => {
		setError(null); // Reset any previous errors
		setLoading(true);
		const result = await login(email, password);
		if (result) {
			setError(result.message);
		}
		setLoading(false);
	};

	return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<form
				onSubmit={form.onSubmit((values) =>
					handelLogin(values.email, values.password)
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
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>

				{/* Show the error message */}
				{error && (
					<Text color="red" mt="md">
						{error}
					</Text>
				)}

				<Group mt="md" justify="space-between">
					<Checkbox label="Remember me" />
					<Link href="/register">Create Account</Link>
				</Group>

				<Button disabled={loading} fullWidth mt="xl" type="submit">
					{loading ? <Loader size="xs" /> : "Login"}
				</Button>
			</form>
		</Card>
	);
}
