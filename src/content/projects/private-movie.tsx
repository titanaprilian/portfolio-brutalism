export interface CaseStudySection {
	id: string;
	heading: string;
	paragraphs: string[];
}

export interface CaseStudyLink {
	label: string;
	href: string;
	external: boolean;
}

export interface CaseStudy {
	title: string;
	summary: string;
	tags: string[];
	sections: CaseStudySection[];
	links: CaseStudyLink[];
}

export const privateMovieCaseStudy: CaseStudy = {
	title: "Private Movie",
	summary:
		"A movie streaming app with an Android TV client and a web admin panel for managing the catalog.",
	tags: ["Android TV", "Admin web UI", "TypeScript"],
	sections: [
		{
			id: "problem",
			heading: "Problem",
			paragraphs: [
				// TODO: Titan to confirm the exact problem statement and who the app serves
				"Browsing and managing a personal movie catalog across TV and web clients means keeping one consistent source of truth for titles, artwork, and playback state.",
				"Private Movie addresses this with a backend-for-frontend API that serves both an Android TV client and a web admin panel from the same catalog.",
			],
		},
		{
			id: "role",
			heading: "Titan's Role",
			paragraphs: [
				// TODO: Titan to confirm his exact responsibilities on this project
				"Titan designed and built the project end to end, from the database schema and API to the Android TV client and the admin web UI.",
			],
		},
		{
			id: "architecture",
			heading: "Architecture",
			paragraphs: [
				// TODO: Titan to confirm the architecture details and provide a real diagram
				"Clients talk to a single API layer backed by Postgres. The Android TV app handles lean-back browsing and playback, while the admin panel manages the catalog.",
			],
		},
		{
			id: "stack",
			heading: "Tech Stack",
			paragraphs: [
				// TODO: Titan to confirm the exact stack (client language, API framework, database)
				"The project is built with TypeScript across the web surfaces, with a dedicated Android TV client and a Postgres-backed API.",
			],
		},
		{
			id: "outcome",
			heading: "Outcome",
			paragraphs: [
				// TODO: Titan to provide real outcomes — no invented metrics, user counts, or performance numbers
				"The result is a working streaming setup: browse and play on TV, manage the catalog from the web, all from one backend.",
			],
		},
	],
	links: [
		// TODO: wired to siteConfig.livePrivateMovieUrl / new privateMovieRepoUrl
		{
			label: "Visit the live site",
			href: "https://private-movie.titanic.me",
			external: true,
		},
		{
			label: "View the repo →",
			href: "https://github.com/titanaprilian/private-movie",
			external: true,
		},
	],
};
