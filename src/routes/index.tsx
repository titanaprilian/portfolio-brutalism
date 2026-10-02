import { createFileRoute } from "@tanstack/react-router";
import { routeHead } from "../lib/seo";
import { HomePage } from "../modules/home";

export const Route = createFileRoute("/")({
	component: Home,
	head: () =>
		routeHead({
			path: "/",
			title: "Titan | Junior Full-Stack Developer",
			description:
				"Portfolio of Titan, junior full-stack developer graduating December 2026. Featured work, skills, and contact links.",
		}),
});

function Home() {
	return <HomePage />;
}
