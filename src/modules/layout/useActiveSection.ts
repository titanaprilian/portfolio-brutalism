import { useEffect, useState } from "react";
import type { NavLink } from "./Sidebar";

export function useActiveSection(nav: NavLink[]): string | null {
	const [active, setActive] = useState<string | null>(null);
	const key = nav
		.map((link) => link.href)
		.filter((href) => href.startsWith("#"))
		.join("|");

	useEffect(() => {
		const ids = key.split("|").filter(Boolean);
		if (ids.length === 0) {
			setActive(null);
			return;
		}
		// Default to the first section (e.g. About) so there is always a
		// highlighted item — short top sections may never cross the
		// detection band on tall viewports before anything else does.
		setActive((prev) => prev ?? ids[0]);
		if (typeof IntersectionObserver === "undefined") return;
		const elements = ids
			.map((hash) => document.querySelector(hash))
			.filter((el): el is Element => el !== null);
		if (elements.length === 0) return;
		// Track every section crossing a band near the top of the viewport
		// (instead of a thin middle slice) so short sections like About
		// reliably intersect it. The deepest visible section wins; when
		// nothing crosses (gaps between sections) the previous item sticks
		// so the highlight never jumps around.
		const visible = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const hash = `#${(entry.target as Element).id}`;
					if (entry.isIntersecting) {
						visible.add(hash);
					} else {
						visible.delete(hash);
					}
				}
				for (let i = ids.length - 1; i >= 0; i--) {
					if (visible.has(ids[i])) {
						setActive(ids[i]);
						break;
					}
				}
			},
			{ rootMargin: "-20% 0px -70% 0px", threshold: 0 },
		);
		for (const el of elements) observer.observe(el);
		return () => observer.disconnect();
	}, [key]);

	return active;
}
