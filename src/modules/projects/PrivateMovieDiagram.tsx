export function PrivateMovieDiagram() {
	return (
		<svg
			className="diagram"
			role="img"
			aria-labelledby="pm-arch-title pm-arch-desc"
			viewBox="0 0 640 340"
			width="100%"
			style={{ height: "auto", display: "block" }}
		>
			<title id="pm-arch-title">
				Private Movie monorepo architecture diagram
			</title>
			<desc id="pm-arch-desc">
				Android TV and React web clients connect to the Elysia API, which reads
				PostgreSQL via Drizzle ORM and S3/B2 storage, enriched by the TMDB
				ingestion pipeline.
			</desc>
			<defs>
				<marker
					id="pm-arrow"
					viewBox="0 0 10 10"
					refX="9"
					refY="5"
					markerWidth="8"
					markerHeight="8"
					orient="auto-start-reverse"
				>
					<path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)" />
				</marker>
			</defs>
			{/* Clients */}
			<rect
				x="16"
				y="36"
				width="150"
				height="72"
				fill="var(--yellow)"
				stroke="var(--ink)"
				strokeWidth="3"
			/>
			<text
				x="91"
				y="64"
				textAnchor="middle"
				fontSize="13"
				fontWeight="700"
				fill="#111"
			>
				Android TV
			</text>
			<text x="91" y="82" textAnchor="middle" fontSize="11" fill="#111">
				Kotlin / Compose
			</text>
			<rect
				x="16"
				y="124"
				width="150"
				height="72"
				fill="var(--pink)"
				stroke="var(--ink)"
				strokeWidth="3"
			/>
			<text
				x="91"
				y="152"
				textAnchor="middle"
				fontSize="13"
				fontWeight="700"
				fill="#111"
			>
				Web App
			</text>
			<text x="91" y="170" textAnchor="middle" fontSize="11" fill="#111">
				React 19 + TanStack
			</text>
			{/* Elysia API */}
			<rect
				x="246"
				y="80"
				width="150"
				height="72"
				fill="var(--blue)"
				stroke="var(--ink)"
				strokeWidth="3"
			/>
			<text
				x="321"
				y="108"
				textAnchor="middle"
				fontSize="13"
				fontWeight="700"
				fill="#111"
			>
				Elysia API
			</text>
			<text x="321" y="126" textAnchor="middle" fontSize="11" fill="#111">
				Deep Modules
			</text>
			{/* Storage */}
			<rect
				x="476"
				y="36"
				width="150"
				height="72"
				fill="var(--green)"
				stroke="var(--ink)"
				strokeWidth="3"
			/>
			<text
				x="551"
				y="64"
				textAnchor="middle"
				fontSize="13"
				fontWeight="700"
				fill="#111"
			>
				PostgreSQL
			</text>
			<text x="551" y="82" textAnchor="middle" fontSize="11" fill="#111">
				via Drizzle ORM
			</text>
			<rect
				x="476"
				y="124"
				width="150"
				height="72"
				fill="var(--card)"
				stroke="var(--ink)"
				strokeWidth="3"
			/>
			<text
				x="551"
				y="152"
				textAnchor="middle"
				fontSize="13"
				fontWeight="700"
				fill="var(--ink)"
			>
				S3 / B2
			</text>
			<text x="551" y="170" textAnchor="middle" fontSize="11" fill="var(--ink)">
				artwork + media
			</text>
			{/* Ingestion pipeline */}
			<rect
				x="246"
				y="232"
				width="150"
				height="72"
				fill="var(--card)"
				stroke="var(--ink)"
				strokeWidth="3"
				strokeDasharray="8 5"
			/>
			<text
				x="321"
				y="260"
				textAnchor="middle"
				fontSize="13"
				fontWeight="700"
				fill="var(--ink)"
			>
				TMDB API
			</text>
			<text x="321" y="278" textAnchor="middle" fontSize="11" fill="var(--ink)">
				+ scrapers
			</text>
			{/* Arrows: clients -> API */}
			<line
				x1="166"
				y1="72"
				x2="240"
				y2="100"
				stroke="var(--ink)"
				strokeWidth="3"
				markerEnd="url(#pm-arrow)"
			/>
			<line
				x1="166"
				y1="160"
				x2="240"
				y2="130"
				stroke="var(--ink)"
				strokeWidth="3"
				markerEnd="url(#pm-arrow)"
			/>
			{/* Arrows: API -> storage */}
			<line
				x1="396"
				y1="100"
				x2="470"
				y2="72"
				stroke="var(--ink)"
				strokeWidth="3"
				markerEnd="url(#pm-arrow)"
			/>
			<line
				x1="396"
				y1="130"
				x2="470"
				y2="160"
				stroke="var(--ink)"
				strokeWidth="3"
				markerEnd="url(#pm-arrow)"
			/>
			{/* Arrow: ingestion -> API/storage */}
			<line
				x1="321"
				y1="232"
				x2="321"
				y2="158"
				stroke="var(--ink)"
				strokeWidth="3"
				strokeDasharray="6 4"
				markerEnd="url(#pm-arrow)"
			/>
			<text x="331" y="200" fontSize="11" fontWeight="700" fill="var(--ink)">
				ingestion
			</text>
		</svg>
	);
}
