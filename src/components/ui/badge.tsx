import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva("inline-flex w-fit items-center font-bold", {
	variants: {
		variant: {
			status:
				"gap-[10px] px-[14px] py-[8px] text-[14px] bg-green text-[#111] border-3 border-ink shadow-[4px_4px_0_var(--ink)]",
			live: "text-[14px] px-[10px] py-[2px] bg-green text-[#111] border-2 border-ink",
			tag: "text-[14px] px-[10px] py-[2px] border-2 border-ink bg-bg",
			chip: "text-[14px] px-[10px] py-[2px] border-2 border-ink bg-white text-[#111]",
		},
	},
	defaultVariants: { variant: "tag" },
});

export interface BadgeProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ variant, className, ...props }: BadgeProps) {
	return (
		<span
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { badgeVariants };
