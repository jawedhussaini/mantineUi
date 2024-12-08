import { useState } from "react";
import { ComboboxItem, Select, TextInput } from "@mantine/core";
import { FeaturePropsSearch } from "@/interfaces/AllIInterfaces";

export default function SearchInput({
	setvalue,
	value,
	placeholder,
}: FeaturePropsSearch) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Extract the value from the event
		setvalue(event.target.value);
	};

	return (
		<TextInput
			required
			withAsterisk
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	);
}
