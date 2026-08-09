import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
	it("renders its children", () => {
		render(<Badge status="success">Filled</Badge>);
		expect(screen.getByText("Filled")).toBeInTheDocument();
	});

	it("applies the status-specific colour classes", () => {
		render(<Badge status="error">Rejected</Badge>);
		expect(screen.getByText("Rejected")).toHaveClass("text-semantic-error");
	});

	it("merges a caller-supplied className", () => {
		render(
			<Badge status="neutral" className="ml-2">
				Idle
			</Badge>,
		);
		expect(screen.getByText("Idle")).toHaveClass("ml-2");
	});
});
