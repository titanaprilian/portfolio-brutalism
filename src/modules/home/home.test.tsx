import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

function renderHome() {
	return render(<HomePage />);
}

describe("HomePage", () => {
	it("renders identity, role, and availability badge", () => {
		renderHome();
		expect(
			screen.getByRole("heading", { name: "Titan", level: 1 }),
		).toBeInTheDocument();
		expect(screen.getByText("Junior full-stack developer")).toBeInTheDocument();
		expect(
			screen.getByText("Available now for roles and internships"),
		).toBeInTheDocument();
	});

	it("renders all key sections with headings", () => {
		renderHome();
		for (const name of ["About", "Projects", "Skills", "Education"]) {
			expect(
				screen.getByRole("heading", { name, level: 2 }),
			).toBeInTheDocument();
		}
	});

	it("renders verbatim about copy with graduation timeline", () => {
		renderHome();
		expect(screen.getByText(/final-year student/)).toBeInTheDocument();
		expect(screen.getByText(/graduating in December 2026/)).toBeInTheDocument();
		expect(
			screen.getByText("Universitas Muhammadiyah Ponorogo", {
				selector: "h3",
			}),
		).toBeInTheDocument();
	});

	it("shows the Private Movie preview screenshot with accessible text", () => {
		renderHome();
		const shot = screen.getByRole("img", { name: /private movie/i });
		expect(shot).toHaveAttribute("src", "/projects/private-movie-preview.webp");
		expect(shot.getAttribute("alt")).not.toHaveLength(0);
	});

	it("links the featured card to the case study and others to GitHub", () => {
		renderHome();
		expect(
			screen.getByRole("link", { name: "Read the case study →" }),
		).toHaveAttribute("href", "/projects/private-movie");
		expect(screen.getByText("Live now")).toBeInTheDocument();
		const repoLinks = screen.getAllByRole("link", { name: "View the repo →" });
		expect(repoLinks).toHaveLength(2);
		for (const link of repoLinks) {
			expect(link).toHaveAttribute(
				"href",
				expect.stringMatching(/^https:\/\//),
			);
			expect(link).toHaveAttribute("rel", "noopener noreferrer");
		}
		expect(
			screen.getByRole("link", { name: "See everything on GitHub →" }),
		).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
	});

	it("renders skill boxes, education, CV link, and footer", () => {
		renderHome();
		for (const name of ["Backend", "Frontend", "How I work"]) {
			expect(
				screen.getByRole("heading", { name, level: 3 }),
			).toBeInTheDocument();
		}
		expect(screen.getByText("Drizzle ORM")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute(
			"href",
			"/titanic-cv.pdf",
		);
		expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
			"href",
			"mailto:hello@yourdomain.me",
		);
		expect(
			screen.getByText("Built by Titan with React and TypeScript."),
		).toBeInTheDocument();
	});

	it("renders accessible sidebar social icons linking to real profiles", () => {
		renderHome();
		expect(
			screen.getByRole("link", { name: "GitHub profile" }),
		).toHaveAttribute("href", "https://github.com/titanaprilian");
		expect(
			screen.getByRole("link", { name: "LinkedIn profile" }),
		).toHaveAttribute("href", "https://www.linkedin.com/in/titanaprilian");
	});
});
