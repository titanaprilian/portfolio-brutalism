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

import { siteConfig } from "../../config/site";

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
		"A self-hosted movie streaming platform in a Turborepo monorepo on the Bun runtime — Kotlin / Jetpack Compose Android TV client, React 19 web app, Elysia backend, and PostgreSQL via Drizzle ORM.",
	tags: ["Android TV", "React 19", "Elysia", "PostgreSQL", "Drizzle ORM"],
	sections: [
		{
			id: "problem",
			heading: "Problem",
			paragraphs: [
				"Commercial TV streaming subscriptions keep piling up — one more service, one more monthly bill — just to watch movies spread across platforms you don't control.",
				"The free alternative is worse on a TV: browser-based playback with tiny controls, broken fullscreen, and intrusive ad-click scripts that hijack taps into popups and redirects instead of playing the movie.",
				"Private Movie is built open source so anyone can fix this for themselves: clone the repo, self-host the stack, and run your own private streaming service with a native TV playback experience and no ad-click traps.",
			],
		},
		{
			id: "role",
			heading: "My Role",
			paragraphs: [
				"I designed and built the project end to end, from the PostgreSQL schema via Drizzle ORM and the Elysia API modules to the Kotlin / Jetpack Compose Android TV client and the React 19 admin web app with TanStack Router and TanStack Query.",
			],
		},
		{
			id: "architecture",
			heading: "Architecture",
			paragraphs: [
				"The Turborepo monorepo runs on the Bun runtime. The Android TV app (Kotlin / Jetpack Compose) and the React 19 web app (TanStack Router + TanStack Query) both talk to a single Elysia API built with Deep Modules. The API persists the catalog in PostgreSQL via Drizzle ORM and stores artwork and media in S3/B2-compatible storage.",
				"A media ingestion pipeline enriches the catalog from the TMDB API and dedicated scrapers, normalizing titles, artwork, and metadata before they reach the clients.",
			],
		},
		{
			id: "stack",
			heading: "Tech Stack",
			paragraphs: [
				"Turborepo monorepo on the Bun runtime. Backend: Elysia with Deep Modules. TV client: Kotlin with Jetpack Compose. Web app: React 19 with TanStack Router and TanStack Query. Database: PostgreSQL via Drizzle ORM. Storage: S3/B2-compatible object storage. Media ingestion: TMDB API plus dedicated scrapers.",
			],
		},
		{
			id: "outcome",
			heading: "Outcome",
			paragraphs: [
				"The result is a working streaming setup: browse and play on TV, manage the catalog from the web, all from one Elysia backend backed by PostgreSQL and S3/B2 storage.",
			],
		},
	],
	links: [
		{
			label: "Visit the live site →",
			href: siteConfig.livePrivateMovieUrl,
			external: true,
		},
		{
			label: "View the repo →",
			href: "https://github.com/titanaprilian/private-movie",
			external: true,
		},
	],
};
