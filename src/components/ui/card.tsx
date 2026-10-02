import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const cardVariants = cva(
	"bg-card border-3 border-ink shadow-[6px_6px_0_var(--ink)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:transition-none px-[26px] py-[24px] flex flex-col gap-[12px]",
	{
		variants: {
			variant: {
				default: "",
				feature: "md:grid md:grid-cols-[240px_1fr] md:items-stretch md:gap-0",
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
				"hover:-translate-y-1.5 focus-within:-translate-y-1.5",
				className,
			)}
			{...props}
		/>
	);
}

export { cardVariants };
