import { siteConfig } from "../../config/site";
import { SectionHeading } from "../../ui/SectionHeading";
import {
	FeaturedProjectCard,
	featuredProject,
	otherProjects,
	ProjectCard,
} from "../projects";

export function ProjectsSection() {
	return (
		<section id="projects" aria-labelledby="projects-heading">
			<SectionHeading>Projects</SectionHeading>
			<div className="cards">
				<FeaturedProjectCard project={featuredProject} />
				{otherProjects.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
			<a
				className="more"
				href={siteConfig.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				See everything on GitHub →
			</a>
		</section>
	);
}
