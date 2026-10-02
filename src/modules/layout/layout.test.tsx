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

	it("renders the theme toggle as a floating top-right overlay", () => {
		renderLayout();
		const toggle = screen.getByRole("button", { name: /switch to/i });
		expect(toggle.closest(".theme-toggle-float")).not.toBeNull();
		expect(toggle.closest("aside")).toBeNull();
	});

	it("defaults to the first nav item so short top sections stay reachable", () => {
		expect(
			(window as unknown as { IntersectionObserver?: unknown })
				.IntersectionObserver,
		).toBeUndefined();
		render(
			<SiteLayout sidebar={sidebar}>
				<section id="about">
					<h2>About</h2>
				</section>
				<section id="projects">
					<h2>Projects</h2>
				</section>
			</SiteLayout>,
		);
		const about = screen.getByRole("link", { name: "About" });
		expect(about).toHaveAttribute("aria-current", "true");
		expect(about).toHaveClass("is-active");
	});

	it("highlights the in-view section nav item with aria-current", async () => {
		type Entry = { isIntersecting: boolean; target: Element };
		let callback: ((entries: Entry[]) => void) | null = null;
		const observe = vi.fn();
		vi.stubGlobal(
			"IntersectionObserver",
			vi.fn((cb: (entries: Entry[]) => void) => {
				callback = cb;
				return { observe, unobserve: vi.fn(), disconnect: vi.fn() };
			}),
		);
		try {
			render(
				<SiteLayout sidebar={sidebar}>
					<section id="about">
						<h2>About</h2>
					</section>
					<section id="projects">
						<h2>Projects</h2>
					</section>
				</SiteLayout>,
			);
			expect(observe).toHaveBeenCalledTimes(2);
			expect(callback).not.toBeNull();
			const { act } = await import("react");
			const target = document.getElementById("projects");
			expect(target).not.toBeNull();
			act(() => {
				callback?.([{ isIntersecting: true, target: target as Element }]);
			});
			const projects = screen.getByRole("link", { name: "Projects" });
			expect(projects).toHaveAttribute("aria-current", "true");
			expect(projects).toHaveClass("is-active");
			expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
				"aria-current",
			);
		} finally {
			vi.unstubAllGlobals();
		}
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
