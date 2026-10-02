import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import type { Project } from "./projects";

function ProjectLink({ project }: { project: Project }) {
	return project.external ? (
		<a
			className="link"
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{project.linkLabel}
		</a>
	) : (
		<a className="link" href={project.href}>
			{project.linkLabel}
		</a>
	);
}

export function FeaturedProjectCard({ project }: { project: Project }) {
	return (
		<Card variant="feature">
			{project.imageSrc ? (
				<img
					className="project-shot"
					src={project.imageSrc}
					alt={project.imageAlt ?? `${project.title} preview`}
					loading="lazy"
				/>
			) : null}
			<div className="feature-body">
				{project.live ? <Badge variant="live">Live now</Badge> : null}
				<h3>{project.title}</h3>
				<p>{project.description}</p>
				<div className="tags">
					{project.tags.map((tag) => (
						<Badge key={tag} variant="tag">
							{tag}
						</Badge>
					))}
				</div>
				<ProjectLink project={project} />
			</div>
		</Card>
	);
}

export function ProjectCard({ project }: { project: Project }) {
	return (
		<Card>
			<h3>{project.title}</h3>
			<p>{project.description}</p>
			<div className="tags">
				{project.tags.map((tag) => (
					<Badge key={tag} variant="tag">
						{tag}
					</Badge>
				))}
			</div>
			<ProjectLink project={project} />
		</Card>
	);
}
