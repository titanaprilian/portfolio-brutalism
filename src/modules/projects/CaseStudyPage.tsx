import { Badge } from "../../components/ui/badge";
import { privateMovieCaseStudy } from "../../content/projects/private-movie";
import { SectionHeading } from "../../ui/SectionHeading";
import { profileSidebar, SiteLayout } from "../layout";
import { PrivateMovieDiagram } from "./PrivateMovieDiagram";

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
						{section.id === "architecture" ? <PrivateMovieDiagram /> : null}
					</section>
				))}
				<section aria-label="Project links">
					<SectionHeading>Links</SectionHeading>
					<div className="cta">
						{study.links.map((link, index) =>
							link.external ? (
								<a
									key={link.label}
									className={index === 0 ? "btn" : "btn alt"}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.label}
								</a>
							) : (
								<a
									key={link.label}
									className={index === 0 ? "btn" : "btn alt"}
									href={link.href}
								>
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
