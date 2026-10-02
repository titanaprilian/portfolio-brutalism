import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"inline-block font-bold border-3 border-ink shadow-[4px_4px_0_var(--ink)] transition-transform transition-shadow duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none motion-reduce:transform-none motion-reduce:transition-none text-[15px] px-[18px] py-[11px] no-underline text-[#111]",
	{
		variants: {
			variant: {
				default: "bg-yellow",
				alt: "bg-blue",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export function Button({ variant, className, type, ...props }: ButtonProps) {
	return (
		<button
			type={type ?? "button"}
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { buttonVariants };
