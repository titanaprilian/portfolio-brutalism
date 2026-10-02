import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { routeHead } from "../../lib/seo";

describe("routeHead", () => {
	it("declares title, description, canonical, and OG/Twitter tags", () => {
		const head = routeHead({
			path: "/projects/private-movie",
			title: "Private Movie — Case Study | Titan",
			description: "Case study.",
		});
		const meta = head.meta as Array<Record<string, string>>;
		const by = (key: string, value: string) =>
			meta.find((tag) => tag[key] === value)?.content;
		expect(by("name", "description")).toBe("Case study.");
		expect(by("property", "og:title")).toContain("Private Movie");
		expect(by("property", "og:url")).toBe(
			"https://titanaprilian.me/projects/private-movie",
		);
		expect(by("property", "og:image")).toBe("https://titanaprilian.me/og.png");
		expect(by("name", "twitter:card")).toBe("summary_large_image");
		expect(by("name", "twitter:image")).toBe("https://titanaprilian.me/og.png");
		expect(head.links).toEqual([
			{
				rel: "canonical",
				href: "https://titanaprilian.me/projects/private-movie",
			},
		]);
	});

	it("produces unique titles and canonical URLs per route", () => {
		const home = routeHead({ path: "/", title: "Home", description: "d" });
		const notFound = routeHead({
			path: "/404",
			title: "404",
			description: "d",
		});
		expect(home.links?.[0]?.href).toBe("https://titanaprilian.me/");
		expect(notFound.links?.[0]?.href).toBe("https://titanaprilian.me/404");
	});
});

describe("NotFoundPage", () => {
	it("renders an on-brand 404 with a back-to-home action", async () => {
		const { NotFoundPage } = await import("../layout/NotFoundPage");
		const { container } = render(<NotFoundPage />);
		expect(
			screen.getByRole("heading", { name: "Page not found", level: 1 }),
		).toBeInTheDocument();
		expect(container.querySelectorAll("h1")).toHaveLength(1);
		const backLinks = screen.getAllByRole("link", { name: /back to home/i });
		expect(backLinks.length).toBeGreaterThanOrEqual(1);
		for (const link of backLinks) {
			expect(link).toHaveAttribute("href", "/");
		}
	});
});
