import { useEffect, useRef, useState } from "react";

const LERP_NORMAL = 0.18;
const LERP_REDUCED = 1; // instant snap under reduced-motion

/** Selectors that expand + highlight the ring on hover. */
const INTERACTIVE = "a, button, [role='button'], label[for]";

export function CursorFollower() {
	const ringRef = useRef<HTMLDivElement>(null);
	const visibleRef = useRef(false);
	// Render state: controls CSS classes / attributes
	const [visible, setVisible] = useState(false);
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		// Hide on touch-primary devices; the component stays mounted but
		// never shows so it adds zero layout cost.
		const isCoarse =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(pointer: coarse)").matches;
		if (isCoarse) return;

		const reducedMotion =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const lerp = reducedMotion ? LERP_REDUCED : LERP_NORMAL;

		let raf = 0;
		const target = { x: -200, y: -200 };
		const current = { x: -200, y: -200 };

		function tick() {
			current.x += (target.x - current.x) * lerp;
			current.y += (target.y - current.y) * lerp;
			const el = ringRef.current;
			if (el) {
				el.style.transform = `translate(${current.x}px, ${current.y}px)`;
			}
			raf = requestAnimationFrame(tick);
		}

		function onPointerMove(e: PointerEvent) {
			target.x = e.clientX;
			target.y = e.clientY;
			if (!visibleRef.current) {
				visibleRef.current = true;
				setVisible(true);
			}
			if (!raf) raf = requestAnimationFrame(tick);
		}

		function onPointerLeave() {
			visibleRef.current = false;
			setVisible(false);
			setHovered(false);
			cancelAnimationFrame(raf);
			raf = 0;
		}

		function onPointerOver(e: PointerEvent) {
			const t = e.target;
			if (t instanceof Element && t.closest(INTERACTIVE)) {
				setHovered(true);
			}
		}

		function onPointerOut(e: PointerEvent) {
			const t = e.target;
			if (t instanceof Element && t.closest(INTERACTIVE)) {
				setHovered(false);
			}
		}

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onPointerLeave);
		document.addEventListener("pointerover", onPointerOver, { passive: true });
		document.addEventListener("pointerout", onPointerOut, { passive: true });

		return () => {
			cancelAnimationFrame(raf);
			raf = 0;
			window.removeEventListener("pointermove", onPointerMove);
			document.documentElement.removeEventListener(
				"pointerleave",
				onPointerLeave,
			);
			document.removeEventListener("pointerover", onPointerOver);
			document.removeEventListener("pointerout", onPointerOut);
		};
	}, []);

	return (
		<div
			ref={ringRef}
			className="cursor-ring"
			data-testid="cursor-ring"
			data-visible={visible}
			data-hovered={hovered}
			aria-hidden="true"
		/>
	);
}
