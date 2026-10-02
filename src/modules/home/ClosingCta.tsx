import { siteConfig } from "../../config/site";

export function ClosingCta() {
	return (
		<section aria-labelledby="contact-heading" className="closing-cta">
			<h2 id="contact-heading">Let&apos;s talk</h2>
			<p>
				Have a role, internship, or project in mind? Send a message and
				I&apos;ll get back to you soon.
			</p>
			<div className="cta">
				<a className="btn" href={`mailto:${siteConfig.email}`}>
					Email me
				</a>
				<a className="btn alt" href={siteConfig.cvPath}>
					Download CV
				</a>
			</div>
		</section>
	);
}
