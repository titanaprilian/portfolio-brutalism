import { siteConfig } from "../../config/site";

export interface Project {
	title: string;
	description: string;
	tags: string[];
	href: string;
	external: boolean;
	linkLabel: string;
	live?: boolean;
	imageSrc?: string;
	imageAlt?: string;
	diagram?: "monorepo-architecture";
	diagramLabel?: string;
}

export const featuredProject: Project = {
	title: "Private Movie",
	description:
		"A movie streaming app with an Android TV client and a web admin panel for managing the catalog.",
	tags: ["Android TV", "Admin web UI", "TypeScript"],
	href: "/projects/private-movie",
	external: false,
	linkLabel: "Read the case study →",
	live: true,
	imageSrc: "/projects/private-movie-preview.webp",
	imageAlt:
		"Preview of the Private Movie home screen showing a featured animation title with play and more info buttons",
};

export const otherProjects: Project[] = [
	{
		title: "Pylearn",
		description:
			"A learning management system with dual roles: lecturers manage classes and grading while students access materials and quizzes.",
		tags: ["Next.js", "React", "TypeScript"],
		href: siteConfig.pylearnFeRepoUrl,
		external: true,
		linkLabel: "View the repo →",
		imageSrc: "/projects/pylearn-preview.png",
		imageAlt:
			"Preview of the Pylearn learning management system showing course materials and quiz access",
	},
	{
		title: "Monorepo Starter",
		description:
			"An AI-agent-optimized TypeScript monorepo with apps, shared packages, and tooling/CI wired for predictable agent workflows.",
		tags: ["TypeScript", "Turborepo", "Bun"],
		href: siteConfig.monorepoStarterRepoUrl,
		external: true,
		linkLabel: "View the repo →",
		diagram: "monorepo-architecture",
		diagramLabel:
			"Architecture diagram of the Monorepo Starter: Apps connect to Packages, which connect to Tooling and CI",
	},
];
