import { createFileRoute } from "@tanstack/react-router";
import { routeHead } from "../lib/seo";
import { CaseStudyPage } from "../modules/projects";

export const Route = createFileRoute("/projects/private-movie")({
	component: PrivateMovie,
	head: () =>
		routeHead({
			path: "/projects/private-movie",
			title: "Private Movie — Case Study | Titanic",
			description:
				"Case study of Private Movie: problem, role, architecture, stack, and outcome.",
		}),
});

function PrivateMovie() {
	return <CaseStudyPage />;
}
