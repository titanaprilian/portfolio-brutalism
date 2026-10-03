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
	pylearnFeRepoUrl: string;
	monorepoStarterRepoUrl: string;
}

export const siteConfig: SiteConfig = {
	siteUrl: "https://titanaprilian.me",
	email: "titanaprilian73@gmail.com",
	// TODO: replace with Titan's real GitHub profile URL
	githubUrl: "https://github.com/titanaprilian",
	// TODO: replace with Titan's real LinkedIn profile URL
	linkedinUrl: "https://www.linkedin.com/in/titanaprilian",
	cvPath: "/titanaprilian-cv.pdf",
	name: "Titan",
	role: "Junior full-stack developer",
	tagline: "I build web apps in TypeScript, from the database to the screen.",
	availability: "Available now for roles and internships",
	livePrivateMovieUrl: "https://pmov.titanaprilian.me",
	pylearnFeRepoUrl: "https://github.com/titanaprilian/pylearn-fe",
	monorepoStarterRepoUrl: "https://github.com/titanaprilian/monorepo-starter",
};
