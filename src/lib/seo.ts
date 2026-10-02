import { siteConfig } from "../config/site";

export interface RouteSeo {
	path: string;
	title: string;
	description: string;
}

export function routeHead({ path, title, description }: RouteSeo) {
	const url = `${siteConfig.siteUrl}${path}`;
	const image = `${siteConfig.siteUrl}/og.png`;
	const meta: Array<
		| { title: string }
		| { name: string; content: string }
		| { property: string; content: string }
	> = [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: url },
		{ property: "og:image", content: image },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
	];
	return {
		meta,
		links: [{ rel: "canonical", href: url }],
	};
}
