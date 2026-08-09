/**
 * Extension point for generated docs content: anything derived from source
 * code rather than hand-written (an API reference from an OpenAPI spec, a
 * database schema diagram, a service map, a test-coverage table).
 *
 * The docs-drift pre-commit check (.husky/pre-commit) re-runs this script
 * and fails the commit if it produces output that differs from what's
 * committed. The same pattern generate-component-graph.mjs already uses.
 * Follow that file as a template: write to docs/site/src/data/*.json for
 * raw data and docs/site/src/content/docs/**\/*.mdx for a rendered page,
 * and never embed a timestamp in committed output (it would make the
 * drift check fail on every run for no reason).
 *
 * This file intentionally does nothing yet.
 */

console.log("[generate] No generators configured yet, see docs/site/scripts/generate.mjs");
