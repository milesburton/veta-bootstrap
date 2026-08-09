import { Badge } from "./components/Badge";

export function App() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-page p-8">
			<div className="flex flex-col gap-4 text-strong">
				<h1 className="text-2xl font-semibold">Project</h1>
				<p className="text-muted">
					Replace this page. See{" "}
					<code className="text-primary">docs/site/</code> for the style guide
					and component kitchen sink.
				</p>
				<Badge status="info">Starting point</Badge>
			</div>
		</main>
	);
}
