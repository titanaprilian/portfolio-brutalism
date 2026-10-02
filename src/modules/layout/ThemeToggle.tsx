import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme(): "light" | "dark" | null {
	if (typeof document === "undefined") return null;
	const stored = document.documentElement.dataset.theme;
	if (stored === "light" || stored === "dark") return stored;
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === "light" || saved === "dark") return saved;
	} catch {
		return null;
	}
	return null;
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark" | null>(null);

	useEffect(() => {
		const initial = getInitialTheme();
		if (initial) {
			setTheme(initial);
			return;
		}
		const dark =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		setTheme(dark ? "dark" : "light");
	}, []);

	function toggle() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// storage unavailable (private mode) — theme still applies for session
		}
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={
				theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
			}
			aria-pressed={theme === "dark"}
			className="inline-block cursor-pointer border-3 border-ink bg-card px-[14px] py-[8px] font-body text-[14px] font-bold shadow-[4px_4px_0_var(--ink)] transition-transform transition-shadow duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none motion-reduce:transform-none motion-reduce:transition-none"
		>
			{theme === "dark" ? "☀ Light" : "☾ Dark"}
		</button>
	);
}
