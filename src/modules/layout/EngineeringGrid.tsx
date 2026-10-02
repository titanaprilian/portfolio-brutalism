import { useEffect, useRef } from "react";

export const GRID_SPACING = 28;
export const GLOW_RADIUS = 150;

interface Palette {
	base: string;
	glow: string;
	accent: string;
	line: string;
}

function paletteForTheme(theme: "light" | "dark"): Palette {
	return theme === "dark"
		? {
				base: "rgba(244,243,238,0.22)",
				glow: "rgba(244,243,238,0.95)",
				accent: "rgba(255,225,77,0.9)",
				line: "rgba(244,243,238,0.07)",
			}
		: {
				base: "rgba(17,17,17,0.22)",
				glow: "rgba(17,17,17,0.9)",
				accent: "rgba(17,17,17,0.9)",
				line: "rgba(17,17,17,0.07)",
			};
}

function resolveTheme(): "light" | "dark" {
	if (typeof document === "undefined") return "light";
	const attr = document.documentElement.dataset.theme;
	if (attr === "dark") return "dark";
	if (attr === "light") return "light";
	if (
		typeof window.matchMedia === "function" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return "dark";
	}
	return "light";
}

export function EngineeringGrid() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvasEl = canvasRef.current;
		if (!canvasEl) return;
		const canvas: HTMLCanvasElement = canvasEl;
		const maybeCtx = canvas.getContext("2d");
		if (!maybeCtx) return;
		const ctx: CanvasRenderingContext2D = maybeCtx;

		let raf = 0;
		let width = 0;
		let height = 0;
		let theme: "light" | "dark" = resolveTheme();
		const target = { x: -9999, y: -9999, active: false };
		const current = { x: -9999, y: -9999 };
		const reducedMotion =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			draw();
		}

		function drawStatic() {
			const p = paletteForTheme(theme);
			ctx.clearRect(0, 0, width, height);
			drawLines(p);
			drawDots(p, current.x, current.y, false);
		}

		function drawLines(p: Palette) {
			ctx.strokeStyle = p.line;
			ctx.lineWidth = 1;
			ctx.beginPath();
			for (let x = 0; x <= width; x += GRID_SPACING * 5) {
				ctx.moveTo(x + 0.5, 0);
				ctx.lineTo(x + 0.5, height);
			}
			for (let y = 0; y <= height; y += GRID_SPACING * 5) {
				ctx.moveTo(0, y + 0.5);
				ctx.lineTo(width, y + 0.5);
			}
			ctx.stroke();
		}

		function drawDots(p: Palette, gx: number, gy: number, withGlow: boolean) {
			for (let y = GRID_SPACING / 2; y < height; y += GRID_SPACING) {
				for (let x = GRID_SPACING / 2; x < width; x += GRID_SPACING) {
					let intensity = 0;
					if (withGlow && gx > -5000) {
						const dx = x - gx;
						const dy = y - gy;
						const dist = Math.hypot(dx, dy);
						if (dist < GLOW_RADIUS) intensity = 1 - dist / GLOW_RADIUS;
					}
					if (intensity <= 0) {
						ctx.fillStyle = p.base;
						ctx.beginPath();
						ctx.arc(x, y, 1.5, 0, Math.PI * 2);
						ctx.fill();
					} else {
						const eased = intensity * intensity;
						ctx.fillStyle = eased > 0.55 ? p.accent : p.glow;
						ctx.beginPath();
						ctx.arc(x, y, 1.5 + eased * 2.5, 0, Math.PI * 2);
						ctx.fill();
					}
				}
			}
		}

		function draw() {
			const p = paletteForTheme(theme);
			ctx.clearRect(0, 0, width, height);
			drawLines(p);
			drawDots(p, current.x, current.y, target.active);
		}

		function frame() {
			// Lerp toward the pointer for a smooth trailing glow.
			current.x += (target.x - current.x) * 0.2;
			current.y += (target.y - current.y) * 0.2;
			if (!target.active) {
				const faded =
					Math.abs(current.x - target.x) < 0.5 &&
					Math.abs(current.y - target.y) < 0.5;
				if (faded) {
					target.active = false;
					current.x = -9999;
					current.y = -9999;
					draw();
					raf = 0;
					return;
				}
			}
			draw();
			raf = requestAnimationFrame(frame);
		}

		function kick() {
			if (reducedMotion) {
				drawStatic();
				return;
			}
			if (!raf) raf = requestAnimationFrame(frame);
		}

		function onPointerMove(e: PointerEvent) {
			target.x = e.clientX;
			target.y = e.clientY;
			target.active = true;
			current.x = current.x < -5000 ? target.x : current.x;
			current.y = current.y < -5000 ? target.y : current.y;
			kick();
		}

		function onPointerLeave() {
			target.active = false;
			target.x = -9999;
			target.y = -9999;
			kick();
		}

		const observer = new MutationObserver(() => {
			const next = resolveTheme();
			if (next !== theme) {
				theme = next;
				if (reducedMotion || !raf) draw();
			}
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onPointerLeave);
		window.addEventListener("resize", resize);
		resize();

		return () => {
			cancelAnimationFrame(raf);
			raf = 0;
			observer.disconnect();
			window.removeEventListener("pointermove", onPointerMove);
			document.documentElement.removeEventListener(
				"pointerleave",
				onPointerLeave,
			);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		// biome-ignore lint/a11y/noAriaHiddenOnFocusable: decorative backdrop canvas is never focused or tabbable
		<canvas
			ref={canvasRef}
			className="engineering-grid-canvas"
			aria-hidden="true"
			data-testid="engineering-grid"
		/>
	);
}
