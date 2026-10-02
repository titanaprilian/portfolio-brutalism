import { Badge } from "../../components/ui/badge";
import { profileSidebar, SiteLayout } from "../layout";

export function NotFoundPage() {
	return (
		<SiteLayout
			sidebar={profileSidebar([{ href: "/", label: "← Back to Home" }], {
				compactIdentity: true,
			})}
		>
			<section aria-labelledby="not-found-heading">
				<Badge variant="tag">404</Badge>
				<h1 id="not-found-heading">Page not found</h1>
				<p className="tag">
					This page does not exist or was moved. Head back to safety.
				</p>
				<div className="cta">
					<a className="btn" href="/">
						← Back to Home
					</a>
				</div>
			</section>
		</SiteLayout>
	);
}
