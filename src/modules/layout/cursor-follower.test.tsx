import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CursorFollower } from "./CursorFollower";

function setup(opts: { coarse?: boolean; reducedMotion?: boolean } = {}) {
	vi.stubGlobal(
		"matchMedia",
		vi.fn().mockImplementation((query: string) => ({
			matches:
				(opts.coarse && query === "(pointer: coarse)") ||
				(opts.reducedMotion && query === "(prefers-reduced-motion: reduce)"),
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		})),
	);
	return render(<CursorFollower />);
}

describe("CursorFollower", () => {
	it("renders an aria-hidden ring element", () => {
		setup();
		const ring = screen.getByTestId("cursor-ring");
		expect(ring).toHaveAttribute("aria-hidden", "true");
		expect(ring).toHaveClass("cursor-ring");
	});

	it("starts hidden (data-visible=false) before any pointer move", () => {
		setup();
		const ring = screen.getByTestId("cursor-ring");
		expect(ring).toHaveAttribute("data-visible", "false");
		expect(ring).toHaveAttribute("data-hovered", "false");
	});

	it("becomes visible after a pointermove event", () => {
		setup();
		const ring = screen.getByTestId("cursor-ring");
		act(() => {
			fireEvent.pointerMove(window, { clientX: 100, clientY: 200 });
		});
		expect(ring).toHaveAttribute("data-visible", "true");
	});

	it("hides when the pointer leaves the document", () => {
		setup();
		const ring = screen.getByTestId("cursor-ring");
		act(() => {
			fireEvent.pointerMove(window, { clientX: 50, clientY: 50 });
		});
		expect(ring).toHaveAttribute("data-visible", "true");
		act(() => {
			fireEvent.pointerLeave(document.documentElement);
		});
		expect(ring).toHaveAttribute("data-visible", "false");
	});

	it("sets data-hovered=true when pointer enters a link", () => {
		setup();
		const ring = screen.getByTestId("cursor-ring");
		const link = document.createElement("a");
		link.href = "#";
		document.body.appendChild(link);
		act(() => {
			fireEvent.pointerOver(link);
		});
		expect(ring).toHaveAttribute("data-hovered", "true");
		document.body.removeChild(link);
	});

	it("clears data-hovered when pointer leaves a link", () => {
		setup();
		const ring = screen.getByTestId("cursor-ring");
		const link = document.createElement("a");
		link.href = "#";
		document.body.appendChild(link);
		act(() => {
			fireEvent.pointerOver(link);
		});
		expect(ring).toHaveAttribute("data-hovered", "true");
		act(() => {
			fireEvent.pointerOut(link);
		});
		expect(ring).toHaveAttribute("data-hovered", "false");
		document.body.removeChild(link);
	});

	it("stays invisible on coarse-pointer (touch) devices", () => {
		setup({ coarse: true });
		const ring = screen.getByTestId("cursor-ring");
		act(() => {
			fireEvent.pointerMove(window, { clientX: 100, clientY: 100 });
		});
		// No listeners registered on coarse devices — visible stays false
		expect(ring).toHaveAttribute("data-visible", "false");
	});

	it("renders and becomes visible under prefers-reduced-motion", () => {
		setup({ reducedMotion: true });
		const ring = screen.getByTestId("cursor-ring");
		act(() => {
			fireEvent.pointerMove(window, { clientX: 10, clientY: 20 });
		});
		expect(ring).toHaveAttribute("data-visible", "true");
	});
});
