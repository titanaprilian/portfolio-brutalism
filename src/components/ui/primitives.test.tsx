import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";

describe("Button", () => {
	it("renders the default yellow variant", () => {
		render(<Button>Download CV</Button>);
		const button = screen.getByRole("button", { name: "Download CV" });
		expect(button).toHaveClass("bg-yellow");
	});

	it("renders the alt blue variant", () => {
		render(<Button variant="alt">Email me</Button>);
		expect(screen.getByRole("button", { name: "Email me" })).toHaveClass(
			"bg-blue",
		);
	});
});

describe("Card", () => {
	it("renders a bordered article landmark", () => {
		render(<Card>content</Card>);
		const card = screen.getByText("content");
		expect(card.tagName).toBe("ARTICLE");
		expect(card).toHaveClass("border-ink");
	});

	it("renders the feature variant", () => {
		render(<Card variant="feature">featured</Card>);
		expect(screen.getByText("featured")).toHaveClass("md:grid");
	});
});

describe("Badge", () => {
	it("renders status, live, tag, and chip variants", () => {
		render(
			<>
				<Badge variant="status">Available now</Badge>
				<Badge variant="live">Live now</Badge>
				<Badge variant="tag">TypeScript</Badge>
				<Badge variant="chip">React</Badge>
			</>,
		);
		expect(screen.getByText("Available now")).toHaveClass("bg-green");
		expect(screen.getByText("Live now")).toHaveClass("bg-green");
		expect(screen.getByText("TypeScript")).toHaveClass("bg-bg");
		expect(screen.getByText("React")).toHaveClass("bg-white");
	});
});
