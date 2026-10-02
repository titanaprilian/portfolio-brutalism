import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "theme";

type ViewTransitionReady = { ready: Promise<void> };

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => ViewTransitionReady;
};

function resolveTheme(): "light" | "dark" {
	if (typeof document !== "undefined") {
		const attr = document.documentElement.dataset.theme;
		if (attr === "light" || attr === "dark") return attr;
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved === "light" || saved === "dark") return saved;
		} catch {
			// storage unavailable (private mode) — fall through to media query
		}
		if (
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return "dark";
		}
	}
	return "light";
}

function getInitialTheme(): "light" | "dark" | null {
	if (typeof document === "undefined") return null;
	return resolveTheme();
}

export function SunIcon() {
	return (
		<svg
			className="icon-sun"
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
		</svg>
	);
}

export function MoonIcon() {
	return (
		<svg
			className="icon-moon"
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	);
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark" | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		setTheme(getInitialTheme() ?? "light");
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
		const current = theme ?? resolveTheme();
		const next = current === "dark" ? "light" : "dark";
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
		try {
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
		} catch {
			// view transition failed synchronously — fall back to an instant switch
			applyTheme(next);
		}
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
			className="theme-toggle-btn inline-flex cursor-pointer items-center justify-center border-3 border-ink bg-card shadow-[4px_4px_0_var(--ink)] transition-transform transition-shadow duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none motion-reduce:transform-none motion-reduce:transition-none"
		>
			<span
				className="theme-toggle-icons"
				data-active={theme === "dark" ? "light" : "dark"}
			>
				<SunIcon />
				<MoonIcon />
			</span>
		</button>
	);
}
