import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { SidebarProps } from "./Sidebar";
import { SiteLayout } from "./SiteLayout";

const sidebar: SidebarProps = {
	top: <h1>Titanic</h1>,
	nav: [
		{ href: "#about", label: "About" },
		{ href: "#projects", label: "Projects" },
	],
	bottom: <a href="/titanic-cv.pdf">Download CV</a>,
};

function renderLayout() {
	return render(
		<SiteLayout sidebar={sidebar}>
			<section>
				<h2>About</h2>
			</section>
		</SiteLayout>,
	);
}

describe("SiteLayout", () => {
	it("renders the skip link targeting the main content", () => {
		renderLayout();
		const skip = screen.getByRole("link", { name: "Skip to content" });
		expect(skip).toHaveAttribute("href", "#content");
		expect(screen.getByRole("main")).toHaveAttribute("id", "content");
	});

	it("renders sidebar navigation with an accessible label", () => {
		renderLayout();
		const nav = screen.getByRole("navigation", { name: "Sections" });
		expect(nav).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
			"href",
			"#about",
		);
	});

	it("toggles data-theme and persists the choice to localStorage", async () => {
		const user = userEvent.setup();
		renderLayout();
		const toggle = screen.getByRole("button", { name: /switch to/i });
		await user.click(toggle);
		expect(document.documentElement.dataset.theme).toMatch(/light|dark/);
		expect(localStorage.getItem("theme")).toBe(
			document.documentElement.dataset.theme,
		);
		const first = document.documentElement.dataset.theme;
		await user.click(toggle);
		expect(document.documentElement.dataset.theme).not.toBe(first);
	});
});
