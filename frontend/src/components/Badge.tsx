export type BadgeStatus = "success" | "error" | "warning" | "info" | "neutral";

interface BadgeProps {
	status: BadgeStatus;
	children: React.ReactNode;
	className?: string;
}

const STATUS_CLASSES: Record<BadgeStatus, string> = {
	success:
		"bg-semantic-success/20 text-semantic-success border-semantic-success/40",
	error: "bg-semantic-error/20 text-semantic-error border-semantic-error/40",
	warning:
		"bg-semantic-warning/20 text-semantic-warning border-semantic-warning/40",
	info: "bg-semantic-info/20 text-semantic-info border-semantic-info/40",
	neutral:
		"bg-semantic-neutral/20 text-semantic-neutral border-semantic-neutral/40",
};

export function Badge({ status, children, className = "" }: BadgeProps) {
	return (
		<span
			className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]} ${className}`}
		>
			{children}
		</span>
	);
}
