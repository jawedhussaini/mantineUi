("");
import { Footer } from "@/components/Footer/Footer";

import { Header } from "@/components/Landing/Header";

import { LandingContainer } from "@/components/Landing/LandingContainer";
import TaskDetailsCom from "@/components/TaskDetails/TaskDetails";
import { TaskDetailsProps } from "@/interfaces/AllIInterfaces";

export default function TaskDetails({ params }: TaskDetailsProps) {
	const { id } = params;

	return (
		<LandingContainer>
			<Header
				links={[
					{
						link: "/about",
						label: "Home",
					},
					{
						link: "/learn",
						label: "Features",
					},
					{
						link: "/pricing",
						label: "Pricing",
					},
					{
						link: "/dashboard",
						label: "Dashboard",
					},
				]}
			/>

			<TaskDetailsCom id={id} />
			<Footer />
		</LandingContainer>
	);
}
