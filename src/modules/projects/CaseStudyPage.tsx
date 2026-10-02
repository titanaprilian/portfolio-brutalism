import { Badge } from "../../components/ui/badge";
import { privateMovieCaseStudy } from "../../content/projects/private-movie";
import { SectionHeading } from "../../ui/SectionHeading";
import { profileSidebar, SiteLayout } from "../layout";

export const caseStudyNav = [
	{ href: "/", label: "← Back to Home" },
	...privateMovieCaseStudy.sections.map((section) => ({
		href: `#${section.id}`,
		label: section.heading,
	})),
];

export function CaseStudyPage() {
	const study = privateMovieCaseStudy;
	return (
		<SiteLayout
			sidebar={profileSidebar(caseStudyNav, { compactIdentity: true })}
		>
			<article>
				<p className="tag">{study.summary}</p>
				<h1>{study.title}</h1>
				<div className="tags case-tags">
					{study.tags.map((tag) => (
						<Badge key={tag} variant="tag">
							{tag}
						</Badge>
					))}
				</div>
				{study.sections.map((section) => (
					<section key={section.id} id={section.id}>
						<SectionHeading>{section.heading}</SectionHeading>
						{section.paragraphs.map((paragraph) => (
							<p key={paragraph.slice(0, 24)}>{paragraph}</p>
						))}
						{section.id === "architecture" ? (
							<div
								className="diagram-placeholder"
								role="img"
								aria-label="Architecture diagram placeholder"
							>
								Architecture diagram — coming soon
							</div>
						) : null}
					</section>
				))}
				<section aria-label="Project links">
					<SectionHeading>Links</SectionHeading>
					<div className="cta">
						{study.links.map((link) =>
							link.external ? (
								<a
									key={link.label}
									className="link"
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.label}
								</a>
							) : (
								<a key={link.label} className="link" href={link.href}>
									{link.label}
								</a>
							),
						)}
					</div>
				</section>
			</article>
		</SiteLayout>
	);
}
