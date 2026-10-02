import { render, screen, within } from "@testing-library/react";
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

	it("lists the real project roster with correct repository links", () => {
		renderHome();
		expect(
			screen.getByRole("heading", { name: "Pylearn" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Monorepo Starter" }),
		).toBeInTheDocument();
		expect(screen.getByText(/dual roles/)).toBeInTheDocument();
		expect(screen.getByText(/AI-agent-optimized/)).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: "View the repo →" }),
		).toHaveLength(2);
		const pylearnLink = screen
			.getAllByRole("link", { name: "View the repo →" })
			.find(
				(link) =>
					link.getAttribute("href") ===
					"https://github.com/titanaprilian/pylearn-fe",
			);
		expect(pylearnLink).toBeDefined();
		const monorepoLink = screen
			.getAllByRole("link", { name: "View the repo →" })
			.find(
				(link) =>
					link.getAttribute("href") ===
					"https://github.com/titanaprilian/monorepo-starter",
			);
		expect(monorepoLink).toBeDefined();
	});

	it("renders the Pylearn screenshot banner and the monorepo SVG diagram", () => {
		renderHome();
		const shot = screen.getByRole("img", { name: /pylearn/i });
		expect(shot).toHaveAttribute("src", "/projects/pylearn-preview.png");
		const diagram = screen.getByRole("img", {
			name: /monorepo starter: apps connect to packages/i,
		});
		expect(diagram).toBeInTheDocument();
		expect(diagram.tagName.toLowerCase()).toBe("svg");
	});

	it("renders skill boxes, education, CV link, and footer", () => {
		renderHome();
		for (const name of ["Backend", "Frontend", "How I work"]) {
			expect(
				screen.getByRole("heading", { name, level: 3 }),
			).toBeInTheDocument();
		}
		expect(screen.getByText("Drizzle ORM")).toBeInTheDocument();
		const cvLinks = screen.getAllByRole("link", { name: "Download CV" });
		expect(cvLinks.length).toBeGreaterThanOrEqual(2);
		for (const link of cvLinks) {
			expect(link).toHaveAttribute("href", "/titanic-cv.pdf");
		}
		const emailLinks = screen.getAllByRole("link", { name: "Email me" });
		expect(emailLinks.length).toBeGreaterThanOrEqual(2);
		for (const link of emailLinks) {
			expect(link).toHaveAttribute("href", "mailto:titanaprilian73@gmail.com");
		}
		expect(
			screen.getByText("Built by Titan with React and TypeScript."),
		).toBeInTheDocument();
	});

	it("renders a closing callout with contact actions before the footer", () => {
		renderHome();
		const heading = screen.getByRole("heading", {
			name: "Let's talk",
			level: 2,
		});
		const card = heading.closest("section");
		expect(card).not.toBeNull();
		expect(card).toHaveClass("closing-cta");
		expect(
			within(card as HTMLElement).getByRole("link", { name: "Email me" }),
		).toHaveAttribute("href", "mailto:titanaprilian73@gmail.com");
		expect(
			within(card as HTMLElement).getByRole("link", { name: "Download CV" }),
		).toHaveAttribute("href", "/titanic-cv.pdf");
		const footer = screen
			.getByText("Built by Titan with React and TypeScript.")
			.closest("footer");
		expect(footer).not.toBeNull();
		expect(
			(card as Element).compareDocumentPosition(footer as Node) &
				Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeTruthy();
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
