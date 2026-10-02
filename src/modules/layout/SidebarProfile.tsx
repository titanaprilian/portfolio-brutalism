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
				>
					GitHub
				</a>
				<a
					href={siteConfig.linkedinUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn
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
