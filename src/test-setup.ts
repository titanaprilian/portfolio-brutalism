import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
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
