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
		expect(screen.getByText(/movie streaming app/)).toBeInTheDocument();
	});

	it("renders all case study section headings", () => {
		render(<CaseStudyPage />);
		for (const name of [
			"Problem",
			"Titanic's Role",
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

	it("renders the architecture diagram placeholder", () => {
		render(<CaseStudyPage />);
		expect(
			screen.getByRole("img", { name: "Architecture diagram placeholder" }),
		).toBeInTheDocument();
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
		for (const name of ["Visit the live site", "View the repo"]) {
			const link = screen.getByRole("link", { name });
			expect(link).toHaveAttribute(
				"href",
				expect.stringMatching(/^https:\/\//),
			);
			expect(link).toHaveAttribute("rel", "noopener noreferrer");
		}
	});
});
