import { Badge } from "../../components/ui/badge";
import { SectionHeading } from "../../ui/SectionHeading";

const skillBoxes = [
	{
		className: "c1",
		title: "Backend",
		skills: ["Elysia", "Bun", "Drizzle ORM", "Postgres"],
	},
	{
		className: "c2",
		title: "Frontend",
		skills: ["TypeScript", "React", "TanStack Router"],
	},
	{
		className: "c3",
		title: "How I work",
		skills: [
			"Monorepos",
			"Deep modules",
			"Automated tests",
			"AI-assisted workflows",
		],
	},
];

export function SkillsSection() {
	return (
		<section id="skills" aria-labelledby="skills-heading">
			<SectionHeading>Skills</SectionHeading>
			<div className="skills">
				{skillBoxes.map((box) => (
					<div key={box.title} className={`box ${box.className}`}>
						<h3>{box.title}</h3>
						<div className="chips">
							{box.skills.map((skill) => (
								<Badge key={skill} variant="chip">
									{skill}
								</Badge>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
