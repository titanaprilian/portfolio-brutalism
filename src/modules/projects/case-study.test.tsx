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

	it("shows back-to-home navigation and section anchors", () => {
		render(<CaseStudyPage />);
		expect(
			screen.getByRole("link", { name: "← Back to Home" }),
		).toHaveAttribute("href", "/");
		for (const href of [
			"#problem",
			"#role",
			"#architecture",
			"#stack",
			"#outcome",
		]) {
			const anchors = document.querySelectorAll(
				`nav.side-nav a[href="${href}"]`,
			);
			expect(anchors.length).toBe(1);
		}
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
