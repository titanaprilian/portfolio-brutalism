import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import type { Project } from "./projects";

function ProjectLink({ project }: { project: Project }) {
	if (!project.external) {
		return (
			<a className="btn" href={project.href}>
				{project.linkLabel}
			</a>
		);
	}
	return (
		<a
			className="link"
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{project.linkLabel}
		</a>
	);
}

export function MonorepoDiagram({ label }: { label: string }) {
	return (
		<svg
			className="card-banner-diagram"
			role="img"
			aria-label={label}
			viewBox="0 0 640 280"
			preserveAspectRatio="xMidYMid slice"
		>
			<title>{label}</title>
			<rect
				x="8"
				y="8"
				width="624"
				height="264"
				className="diagram-bg"
				strokeWidth="6"
			/>
			<g fontFamily="Space Grotesk, Arial Black, sans-serif" fontWeight="700">
				<rect
					x="40"
					y="96"
					width="150"
					height="88"
					className="diagram-node diagram-node-apps"
					strokeWidth="5"
				/>
				<text x="115" y="130" textAnchor="middle" className="diagram-text">
					APPS
				</text>
				<text x="115" y="154" textAnchor="middle" className="diagram-subtext">
					web · backend
				</text>
				<rect
					x="245"
					y="96"
					width="150"
					height="88"
					className="diagram-node diagram-node-packages"
					strokeWidth="5"
				/>
				<text x="320" y="130" textAnchor="middle" className="diagram-text">
					PACKAGES
				</text>
				<text x="320" y="154" textAnchor="middle" className="diagram-subtext">
					db · contracts
				</text>
				<rect
					x="450"
					y="96"
					width="150"
					height="88"
					className="diagram-node diagram-node-tooling"
					strokeWidth="5"
				/>
				<text x="525" y="130" textAnchor="middle" className="diagram-text">
					TOOLING
				</text>
				<text x="525" y="154" textAnchor="middle" className="diagram-subtext">
					CI · agents
				</text>
				<g strokeWidth="5">
					<line x1="190" y1="140" x2="245" y2="140" className="diagram-arrow" />
					<line x1="395" y1="140" x2="450" y2="140" className="diagram-arrow" />
					<polygon points="245,140 233,133 233,147" fill="var(--ink)" />
					<polygon points="450,140 438,133 438,147" fill="var(--ink)" />
				</g>
			</g>
		</svg>
	);
}

function ProjectBanner({ project }: { project: Project }) {
	if (project.diagram === "monorepo-architecture") {
		return (
			<div className="card-banner">
				<MonorepoDiagram
					label={
						project.diagramLabel ??
						"Architecture diagram of the Monorepo Starter: Apps connect to Packages, which connect to Tooling and CI"
					}
				/>
			</div>
		);
	}
	if (project.imageSrc) {
		return (
			<div className="card-banner">
				<img
					className="card-banner-img"
					src={project.imageSrc}
					alt={project.imageAlt ?? `${project.title} preview`}
					loading="lazy"
				/>
			</div>
		);
	}
	return null;
}

export function FeaturedProjectCard({ project }: { project: Project }) {
	return (
		<Card variant="feature" className="feature-card">
			{project.imageSrc ? (
				<div className="feature-media">
					<img
						className="project-shot"
						src={project.imageSrc}
						alt={project.imageAlt ?? `${project.title} preview`}
						loading="lazy"
					/>
				</div>
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
		<Card className="standard-card">
			<ProjectBanner project={project} />
			<div className="standard-body">
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
