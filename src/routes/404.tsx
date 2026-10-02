import { createFileRoute } from "@tanstack/react-router";
import { routeHead } from "../lib/seo";
import { NotFoundPage } from "../modules/layout";

export const Route = createFileRoute("/404")({
	component: NotFound,
	head: () =>
		routeHead({
			path: "/404",
			title: "404 — Page Not Found | Titan",
			description:
				"The page you are looking for does not exist. Return to Titan's portfolio.",
		}),
});

function NotFound() {
	return <NotFoundPage />;
}
