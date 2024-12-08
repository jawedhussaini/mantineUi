import { Replay, Task } from "@/interfaces/AllIInterfaces";
import { BarChart } from "@mantine/charts";

// Define the structure for the task data

// Define the structure for processed data
interface ChartData {
	month: string;
	count: number;
}

// Props interface for the Graph component
interface GraphProps {
	tasks: Task[] | Replay[]; // Array of tasks
	color: string; // Color for the bar chart
}

// Function to process tasks and calculate totals by month
const calculateTasksByMonth = (tasks: Task[] | Replay[]): ChartData[] => {
	const monthMap: Record<string, number> = {};

	tasks.forEach((task) => {
		const month = new Date(task.createdAt).toLocaleString("default", {
			month: "short",
		});
		monthMap[month] = (monthMap[month] || 0) + 1;
	});

	const monthOrder = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return monthOrder.map((month) => ({
		month,
		count: monthMap[month] || 0,
	}));
};

// Graph component
function Graph({ tasks, color }: GraphProps) {
	// Process tasks to get chart data
	const data: ChartData[] = calculateTasksByMonth(tasks);

	return (
		<BarChart
			h={300}
			data={data}
			dataKey="month"
			type="stacked"
			series={[
				{
					name: "count",
					color, // Use the color passed in props
				},
			]}
			tickLine="y"
		/>
	);
}

export default Graph;
