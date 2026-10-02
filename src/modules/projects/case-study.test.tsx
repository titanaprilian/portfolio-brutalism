import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudyPage } from "./CaseStudyPage";

describe("CaseStudyPage", () => {
	it("renders one h1 with the project title and summary", () => {
		const { container } = render(<CaseStudyPage />);
		expect(
			screen.getByRole("heading", { name: "Private Movie", level: 1 }),
		).toBeInTheDocument();
		expect(container.querySelectorAll("h1")).toHaveLength(1);
		expect(screen.getByText(/self-hosted movie streaming/)).toBeInTheDocument();
	});

	it("renders the summary below the title with no tag badges", () => {
		const { container } = render(<CaseStudyPage />);
		const article = container.querySelector("article");
		expect(article).not.toBeNull();
		const title = screen.getByRole("heading", {
			name: "Private Movie",
			level: 1,
		});
		const summary = screen.getByText(/self-hosted movie streaming/);
		expect(title.compareDocumentPosition(summary)).toBe(
			Node.DOCUMENT_POSITION_FOLLOWING,
		);
		expect(container.querySelector(".tags.case-tags")).toBeNull();
	});

	it("renders all case study section headings", () => {
		render(<CaseStudyPage />);
		for (const name of [
			"Problem",
			"My Role",
			"Architecture",
			"Tech Stack",
			"Outcome",
			"Links",
		]) {
			expect(
				screen.getByRole("heading", { name, level: 2 }),
			).toBeInTheDocument();
		}
	});

	it("renders the accessible brutalist SVG architecture diagram", () => {
		render(<CaseStudyPage />);
		const diagram = screen.getByRole("img", {
			name: /private movie monorepo architecture/i,
		});
		expect(diagram.tagName.toLowerCase()).toBe("svg");
		expect(diagram).toHaveAttribute(
			"aria-labelledby",
			"pm-arch-title pm-arch-desc",
		);
		for (const label of [
			"Android TV",
			"Web App",
			"Elysia API",
			"PostgreSQL",
			"S3 / B2",
			"TMDB API",
		]) {
			expect(screen.getByText(label, { selector: "text" })).toBeInTheDocument();
		}
	});

	it("details the real monorepo stack in the narrative", () => {
		render(<CaseStudyPage />);
		for (const snippet of [
			/Turborepo/i,
			/Bun runtime/i,
			/Elysia/i,
			/Kotlin.*Jetpack Compose/i,
			/React 19/i,
			/Drizzle ORM/i,
			/PostgreSQL/i,
			/S3\/B2/i,
			/TMDB/i,
		]) {
			expect(screen.getAllByText(snippet).length).toBeGreaterThan(0);
		}
	});

	it("renders a single-column reading layout without the profile sidebar", () => {
		const { container } = render(<CaseStudyPage />);
		expect(container.querySelector(".reading")).not.toBeNull();
		expect(container.querySelector(".layout")).toBeNull();
		expect(container.querySelector("aside.site-aside")).toBeNull();
		expect(screen.queryByText("I build web apps in TypeScript")).toBeNull();
		expect(screen.queryByText(/available now for/i)).toBeNull();
		expect(screen.queryByRole("link", { name: /github profile/i })).toBeNull();
	});

	it("shows back-to-home navigation in the reading header", () => {
		render(<CaseStudyPage />);
		const back = screen.getByRole("link", { name: "← Back to Home" });
		expect(back).toHaveAttribute("href", "/");
		expect(back.closest(".reading-top")).not.toBeNull();
	});

	it("keeps the theme toggle accessible on the case study page", () => {
		render(<CaseStudyPage />);
		expect(
			screen.getByRole("button", { name: /switch to/i }),
		).toBeInTheDocument();
	});

	it("renders external live and repo links safely", () => {
		render(<CaseStudyPage />);
		for (const name of ["Visit the live site →", "View the repo →"]) {
			const link = screen.getByRole("link", { name });
			expect(link).toHaveAttribute(
				"href",
				expect.stringMatching(/^https:\/\//),
			);
			expect(link).toHaveAttribute("rel", "noopener noreferrer");
		}
	});

	it("renders bottom project links as primary and secondary buttons", () => {
		render(<CaseStudyPage />);
		expect(
			screen.getByRole("link", { name: "Visit the live site →" }),
		).toHaveClass("btn");
		expect(screen.getByRole("link", { name: "View the repo →" })).toHaveClass(
			"btn",
			"alt",
		);
	});
});
