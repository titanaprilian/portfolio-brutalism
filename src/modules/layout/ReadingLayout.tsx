import { SkipLink } from "./SkipLink";
import { ThemeToggle } from "./ThemeToggle";

export interface ReadingLayoutProps {
	backHref?: string;
	backLabel?: string;
	children: React.ReactNode;
}

export function ReadingLayout({
	backHref = "/",
	backLabel = "← Back to Home",
	children,
}: ReadingLayoutProps) {
	return (
		<>
			<SkipLink />
			<div className="theme-toggle-float">
				<ThemeToggle />
			</div>
			<div className="reading">
				<header className="reading-top">
					<nav aria-label="Back">
						<a className="reading-back" href={backHref}>
							{backLabel}
						</a>
					</nav>
				</header>
				<main id="content">{children}</main>
			</div>
		</>
	);
}
