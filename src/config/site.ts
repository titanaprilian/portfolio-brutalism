export interface SiteConfig {
	siteUrl: string;
	email: string;
	githubUrl: string;
	linkedinUrl: string;
	cvPath: string;
	name: string;
	role: string;
	tagline: string;
	availability: string;
	livePrivateMovieUrl: string;
	monorepoBackendRepoUrl: string;
	multiAgentWorkflowRepoUrl: string;
}

export const siteConfig: SiteConfig = {
	// TODO: replace with Titan's real production domain (the `.me` domain)
	siteUrl: "https://titanic.me",
	email: "hello@yourdomain.me",
	// TODO: replace with Titan's real GitHub profile URL
	githubUrl: "https://github.com/titanaprilian",
	// TODO: replace with Titan's real LinkedIn profile URL
	linkedinUrl: "https://www.linkedin.com/in/titanaprilian",
	cvPath: "/titanic-cv.pdf",
	name: "Titan",
	role: "Junior full-stack developer",
	tagline: "I build web apps in TypeScript, from the database to the screen.",
	availability: "Available now for roles and internships",
	// TODO: replace with the real live Private Movie URL
	livePrivateMovieUrl: "https://private-movie.titanic.me",
	// TODO: replace with the real Monorepo backend repo URL
	monorepoBackendRepoUrl: "https://github.com/titanaprilian/monorepo-backend",
	// TODO: replace with the real Multi-agent workflow repo URL
	multiAgentWorkflowRepoUrl:
		"https://github.com/titanaprilian/multi-agent-workflow",
};
