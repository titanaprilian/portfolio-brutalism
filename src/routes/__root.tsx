import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { CursorFollower } from "../modules/layout/CursorFollower";
import { EngineeringGrid } from "../modules/layout/EngineeringGrid";

import globalsCss from "../styles/globals.css?url";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}else{document.documentElement.dataset.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
		],
		links: [{ rel: "stylesheet", href: globalsCss }],
		scripts: [
			{
				children: THEME_SCRIPT,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		// suppressHydrationWarning: THEME_SCRIPT sets data-theme before hydration
		// from localStorage, which the server can't know — the mismatch is expected.
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<EngineeringGrid />
				<CursorFollower />
				{children}
				<Scripts />
			</body>
		</html>
	);
}
