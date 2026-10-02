import { Badge } from "../../components/ui/badge";
import { siteConfig } from "../../config/site";
import type { SidebarProps } from "./Sidebar";

export function SidebarIdentity({ compact = false }: { compact?: boolean }) {
	return (
		<>
			<div>
				{compact ? (
					<p className="sidebar-name">{siteConfig.name}</p>
				) : (
					<h1>{siteConfig.name}</h1>
				)}
				<p className="role">{siteConfig.role}</p>
			</div>
			<p className="tag">{siteConfig.tagline}</p>
			<Badge variant="status">
				<i className="pip" aria-hidden="true" />
				{siteConfig.availability}
			</Badge>
		</>
	);
}

export function GithubIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="square"
			strokeLinejoin="miter"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
		</svg>
	);
}

export function LinkedinIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="square"
			strokeLinejoin="miter"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
			<rect x="2" y="9" width="4" height="12" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	);
}

export function SidebarContact() {
	return (
		<>
			<div className="cta">
				<a className="btn" href={siteConfig.cvPath}>
					Download CV
				</a>
				<a className="btn alt" href={`mailto:${siteConfig.email}`}>
					Email me
				</a>
			</div>
			<div className="social">
				<a
					href={siteConfig.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub profile"
				>
					<GithubIcon />
				</a>
				<a
					href={siteConfig.linkedinUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn profile"
				>
					<LinkedinIcon />
				</a>
			</div>
		</>
	);
}

export function profileSidebar(
	nav: SidebarProps["nav"],
	options: { compactIdentity?: boolean } = {},
): SidebarProps {
	return {
		top: <SidebarIdentity compact={options.compactIdentity ?? false} />,
		nav,
		bottom: <SidebarContact />,
	};
}
