import { SectionHeading } from "../../ui/SectionHeading";

export function AboutSection() {
	return (
		<section id="about" className="about" aria-labelledby="about-heading">
			<SectionHeading>About</SectionHeading>
			<p>
				I&apos;m a <strong>final-year student</strong> at Universitas
				Muhammadiyah Ponorogo, graduating in December 2026. I build web apps end
				to end in TypeScript, from the Postgres schema to the React screen.
			</p>
			<p>
				I care about clear module boundaries and tests, and I&apos;m learning
				how to structure code so both people and AI agents can change it safely.
			</p>
		</section>
	);
}
