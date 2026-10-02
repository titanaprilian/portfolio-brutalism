import { useActiveSection } from "./useActiveSection";

export interface NavLink {
	href: string;
	label: string;
}

export interface SidebarProps {
	top: React.ReactNode;
	nav: NavLink[];
	navLabel?: string;
	bottom: React.ReactNode;
}

export function Sidebar({ top, nav, navLabel, bottom }: SidebarProps) {
	const activeId = useActiveSection(nav);
	return (
		<aside className="site-aside">
			<div className="a-top">{top}</div>
			<nav className="side-nav" aria-label={navLabel ?? "Sections"}>
				{nav.map((link) => {
					const isActive = link.href === activeId;
					return (
						<a
							key={link.href}
							href={link.href}
							aria-current={isActive ? "true" : undefined}
							className={isActive ? "is-active" : undefined}
						>
							{link.label}
						</a>
					);
				})}
			</nav>
			<div className="a-bot">{bottom}</div>
		</aside>
	);
}
