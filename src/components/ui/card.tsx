import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const cardVariants = cva(
	"bg-card border-3 border-ink shadow-[6px_6px_0_var(--ink)] transition-transform transition-shadow duration-120 motion-reduce:transform-none motion-reduce:transition-none px-[26px] py-[24px] flex flex-col gap-[12px]",
	{
		variants: {
			variant: {
				default: "",
				feature:
					"md:grid md:grid-cols-[190px_1fr] md:items-center md:gap-[26px]",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export interface CardProps
	extends HTMLAttributes<HTMLElement>,
		VariantProps<typeof cardVariants> {}

export function Card({ variant, className, ...props }: CardProps) {
	return (
		<article
			data-slot="card"
			className={cn(
				cardVariants({ variant }),
				"hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_var(--ink)]",
				className,
			)}
			{...props}
		/>
	);
}

export { cardVariants };
