import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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

	it("swaps the moon icon for the sun icon when switching to dark mode", async () => {
		const user = userEvent.setup();
		renderLayout();
		const toggle = screen.getByRole("button", { name: "Switch to dark mode" });
		expect(toggle.querySelector(".theme-toggle-icons")).toHaveAttribute(
			"data-active",
			"dark",
		);
		expect(toggle.querySelector(".icon-moon")).toBeInTheDocument();
		await user.click(toggle);
		const toggled = screen.getByRole("button", {
			name: "Switch to light mode",
		});
		expect(toggled.querySelector(".theme-toggle-icons")).toHaveAttribute(
			"data-active",
			"light",
		);
		expect(toggled.querySelector(".icon-sun")).toBeInTheDocument();
	});

	it("applies the theme instantly without view transitions", async () => {
		expect(
			(document as unknown as { startViewTransition?: unknown })
				.startViewTransition,
		).toBeUndefined();
		const user = userEvent.setup();
		renderLayout();
		await user.click(screen.getByRole("button", { name: /switch to/i }));
		expect(document.documentElement.dataset.theme).toBe("dark");
		expect(localStorage.getItem("theme")).toBe("dark");
	});

	it("falls back to an instant switch under reduced motion", async () => {
		vi.stubGlobal(
			"matchMedia",
			vi.fn().mockReturnValue({
				matches: true,
				media: "",
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			}),
		);
		const user = userEvent.setup();
		renderLayout();
		expect(
			screen.getByRole("button", { name: "Switch to light mode" }),
		).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /switch to/i }));
		expect(document.documentElement.dataset.theme).toBe("light");
		expect(localStorage.getItem("theme")).toBe("light");
	});
});
