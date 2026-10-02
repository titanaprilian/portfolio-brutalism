import { profileSidebar, SiteLayout } from "../layout";
import { AboutSection } from "./AboutSection";
import { ClosingCta } from "./ClosingCta";
import { EducationSection } from "./EducationSection";
import { Footer } from "./Footer";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";

export const homeNav = [
	{ href: "#about", label: "About" },
	{ href: "#projects", label: "Projects" },
	{ href: "#skills", label: "Skills" },
	{ href: "#education", label: "Education" },
];

export function homeSidebar() {
	return profileSidebar(homeNav);
}

export function HomePage() {
	return (
		<SiteLayout sidebar={homeSidebar()}>
			<AboutSection />
			<ProjectsSection />
			<SkillsSection />
			<EducationSection />
			<ClosingCta />
			<Footer />
		</SiteLayout>
	);
}
