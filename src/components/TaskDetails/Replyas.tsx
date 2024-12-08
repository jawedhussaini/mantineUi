"use client";

import { TaskDetailsPropsss } from "@/interfaces/AllIInterfaces";
import { Card, Text, Badge, Group } from "@mantine/core";
import { useEffect } from "react";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";

export default function Reply({ Name, Email, answer }: TaskDetailsPropsss) {
	// Function to execute JavaScript code
	const executeCode = (code: string) => {
		try {
			// Use `new Function()` to execute the code safely
			const func = new Function(code); // Creates a function from the code string
			func(); // Execute the function
		} catch (error) {
			console.error("Error executing code:", error);
		}
	};

	// Component to highlight the code using highlight.js
	const CodeBlock = ({ code }: { code: string }) => {
		useEffect(() => {
			hljs.highlightAll(); // Apply syntax highlighting after component mounts or code changes
			executeCode(code); // Execute the code when it changes
		}, [code]);

		return (
			<pre>
				<code className="javascript">{code}</code>
			</pre>
		);
	};

	return (
		<Card shadow="sm" radius="md" mb="md" withBorder>
			<Group justify="space-between" mt="md" mb="xs">
				<Text fw={500}>{Email}</Text>
				<Badge color="green">{Name}</Badge>
			</Group>

			{/* Displaying and highlighting the code */}
			<div style={{ marginTop: "30px" }}>
				<h3>Code:</h3>
				<CodeBlock code={answer} />
			</div>
		</Card>
	);
}
