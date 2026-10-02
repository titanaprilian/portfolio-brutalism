import { ThemeToggle } from "./ThemeToggle";

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
	return (
		<aside className="site-aside">
			<div className="a-top">{top}</div>
			<nav className="side-nav" aria-label={navLabel ?? "Sections"}>
				{nav.map((link) => (
					<a key={link.href} href={link.href}>
						{link.label}
					</a>
				))}
			</nav>
			<div className="a-bot">
				{bottom}
				<ThemeToggle />
			</div>
		</aside>
	);
}
