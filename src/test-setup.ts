// jsdom does not implement PointerEvent; alias it to MouseEvent so pointer
// event tests can construct and dispatch PointerEvent instances.
if (typeof PointerEvent === "undefined") {
	// @ts-expect-error -- intentional polyfill for jsdom test environment
	global.PointerEvent = MouseEvent;
}

import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
	// Stub canvas getContext so jsdom doesn't print "Not implemented" noise;
	// EngineeringGrid already guards against null ctx.
	HTMLCanvasElement.prototype.getContext = vi
		.fn()
		.mockReturnValue(null) as typeof HTMLCanvasElement.prototype.getContext;
	vi.stubGlobal(
		"matchMedia",
		vi.fn().mockReturnValue({
			matches: false,
			media: "",
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		}),
	);
	document.documentElement.removeAttribute("data-theme");
	localStorage.clear();
});
