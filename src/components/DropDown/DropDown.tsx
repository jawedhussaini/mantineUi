import { Select } from "@mantine/core";
import { FeatureProps } from "@/interfaces/AllIInterfaces";

export default function DropDown({
	setvalue,
	value,
	placeholder,
	data,
}: FeatureProps) {
	const handleChange = (option: string | null) => {
		if (option !== null) {
			setvalue(option);
		}
	};

	return (
		<Select
			placeholder={placeholder}
			data={data}
			value={value}
			onChange={handleChange}
			defaultValue="React"
			clearable
		/>
	);
}
