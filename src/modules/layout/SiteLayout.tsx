import { Sidebar, type SidebarProps } from "./Sidebar";
import { SkipLink } from "./SkipLink";

export interface SiteLayoutProps {
	sidebar: SidebarProps;
	children: React.ReactNode;
}

export function SiteLayout({ sidebar, children }: SiteLayoutProps) {
	return (
		<>
			<SkipLink />
			<div className="layout">
				<Sidebar {...sidebar} />
				<main id="content">{children}</main>
			</div>
		</>
	);
}
