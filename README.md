# Project bootstrap

A starting point for a new UI/API project: devcontainer, pre-commit guards, an
Astro/Starlight docs site with a style guide and component kitchen sink, and
CI workflow patterns. Extracted from a larger production platform and
genericised, no assumptions about backend architecture (no Kafka, no
service-per-domain pattern, no specific database).

## What's in here

| Path | What it gives you |
| --- | --- |
| `.devcontainer/` | VS Code dev container: offline-tolerant startup, Docker-in-Docker, lockfile-hash caching |
| `.husky/pre-commit` | Lint, type-check, test, docs-drift, private-IP leak guard, prose style checks |
| `docs/site/` | Astro/Starlight docs skeleton, pre-wired style guide + component kitchen sink |
| `.github/workflows/` | CI patterns: changed-paths detection, docs build/lint/link-check, secret scanning, trusted auto-merge |
| `CLAUDE.md` | Placeholder sections for project conventions (architecture, style, "things not to do") |
| `.claude/skills/` | One example skill (`smoke-check`) showing the pattern: frontmatter + linked steps |

## What's deliberately not in here

Business logic, a specific backend architecture, a message bus, a database
choice, domain-specific design tokens. Those belong to the project you build
from this, not the bootstrap.

## Using this as a starting point

```bash
git clone git@github.com:milesburton/veta-bootstrap.git my-new-project
cd my-new-project
rm -rf .git && git init
```

Then:

1. Replace the placeholder tokens in `docs/site/src/styles/custom.css` and
   `frontend/src/index.css` with your project's actual palette (see
   [the style guide](docs/site/src/content/docs/development/style-guide.mdx)
   for the shape to fill in).
2. Update `docs/site/astro.config.mjs`: site title, description, sidebar,
   `DOCS_REPO_URL`, and `docsBase` (must match your repo name for GitHub
   Pages project sites, e.g. `/your-repo-name`, or every base-relative
   asset 404s once deployed even though the build succeeds locally).
3. Set the `BOT_PAT` repo secret if you want `trusted-automerge.yml` to
   work (see "CI workflows" below); delete the workflow if you don't.
4. `pages.yml` only deploys if the repo is public or you have GitHub
   Enterprise with Pages enabled for private repos; delete it otherwise.
5. Delete any pre-commit checks in `.husky/pre-commit` that don't apply yet
   (e.g. the docs-drift regeneration step assumes generator scripts you
   haven't written; it's commented with what to wire up).
6. Fill in `CLAUDE.md` with real project conventions once you have them.
7. Update this README.

## CI workflows

- **`ci.yml`**, changed-paths detection gates a `frontend` job (lint,
  type-check, `npm test`, all via `--if-present` so it's a no-op until you
  add the scripts) and a `docs-build` job (markdown lint, mermaid
  validation, private-IP guard, Astro build, link check). Extend the
  `changes` job's filters as you add more packages.
- **`pages.yml`**, builds `docs/site` and deploys to GitHub Pages on push
  to `main`. Requires the repo to be public (or GitHub Enterprise with
  Pages for private repos) and Pages enabled in repo settings.
- **`gitleaks.yml`**, secret scan on every push/PR plus a weekly cron.
  Works as-is, no secrets required.
- **`trusted-automerge.yml`**, auto-approves and auto-merges PRs once
  required checks pass. Requires a `BOT_PAT` repo secret: a personal
  access token with repo scope, ideally from a bot/service account.
  Without it, the auto-merge step fails (auto-approve still works using
  the default `GITHUB_TOKEN`). This is what lets automation-authored PRs
  (like release-please's) trigger downstream workflows, since actions
  taken with the default `GITHUB_TOKEN` don't raise workflow events.

## Design philosophy

- **Pre-commit over CI for new gates.** Catch problems before they're
  pushed, not after. Only escalate to CI when a check genuinely can't run
  locally (e.g. needs a real deploy target).
- **Docs and code in the same repo, checked by the same build.** The style
  guide and kitchen sink import live components; if a component breaks, the
  docs build fails. There is no separate Storybook to fall out of sync.
- **No comments explaining what code does.** Self-documenting names and
  structure; comments only for non-obvious *why*.
- **Runtime validation at I/O boundaries only.** Zod (or equivalent) for
  HTTP/queue/external-API payloads; trust internal calls.
