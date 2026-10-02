import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "theme";

type ViewTransitionReady = { ready: Promise<void> };

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => ViewTransitionReady;
};

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
	const buttonRef = useRef<HTMLButtonElement>(null);

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

	function applyTheme(next: "light" | "dark") {
		setTheme(next);
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// storage unavailable (private mode) — theme still applies for session
		}
	}

	function toggle() {
		const next = theme === "dark" ? "light" : "dark";
		const reduceMotion =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const transition = (
			document as ViewTransitionDocument
		).startViewTransition?.bind(document);
		if (!transition || reduceMotion || !buttonRef.current) {
			applyTheme(next);
			return;
		}
		const rect = buttonRef.current.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);
		const vt = transition(() => applyTheme(next));
		vt.ready
			.then(() => {
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${endRadius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 550,
						easing: "ease-out",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			})
			.catch(() => {
				// transition aborted (rapid toggle / tab switch) — theme already applied
			});
	}

	return (
		<button
			ref={buttonRef}
			type="button"
			onClick={toggle}
			aria-label={
				theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
			}
			aria-pressed={theme === "dark"}
			className="inline-block self-start cursor-pointer border-3 border-ink bg-card px-[14px] py-[8px] font-body text-[14px] font-bold shadow-[4px_4px_0_var(--ink)] transition-transform transition-shadow duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none motion-reduce:transform-none motion-reduce:transition-none"
		>
			{theme === "dark" ? "☀ Light" : "☾ Dark"}
		</button>
	);
}
