export interface Project {
	title: string;
	description: string;
	tags: string[];
	href: string;
	external: boolean;
	linkLabel: string;
	live?: boolean;
}

export const featuredProject: Project = {
	title: "Private Movie",
	description:
		"A movie streaming app with an Android TV client and a web admin panel for managing the catalog.",
	tags: ["Android TV", "Admin web UI", "TypeScript"],
	href: "/projects/private-movie",
	external: false,
	linkLabel: "Read the case study",
	live: true,
};

export const otherProjects: Project[] = [
	{
		title: "Monorepo backend",
		description:
			"A production-grade API built with Elysia, Bun, Drizzle and Postgres. Code is split into deep modules and covered by three tiers of tests.",
		tags: ["Elysia", "Bun", "Drizzle", "Postgres"],
		// TODO: wired to siteConfig.monorepoBackendRepoUrl in ProjectsSection
		href: "https://github.com/titanic/monorepo-backend",
		external: true,
		linkLabel: "View the repo",
	},
	{
		title: "Multi-agent workflow",
		description:
			"A GitHub-based workflow where AI agents coordinate through SKILL.md files, so work moves between them in a predictable way.",
		tags: ["GitHub", "SKILL.md", "AI agents"],
		// TODO: wired to siteConfig.multiAgentWorkflowRepoUrl in ProjectsSection
		href: "https://github.com/titanic/multi-agent-workflow",
		external: true,
		linkLabel: "View the repo",
	},
];
