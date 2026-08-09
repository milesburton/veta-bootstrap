# Project conventions

Delete this line and the placeholder sections below once real conventions
replace them. Keep the headings: they give an AI assistant working in this
repo a predictable place to look.

## What this project is

One or two sentences: what it does, who it's for, what "done" looks like
for a typical change.

## Architecture

Where the major pieces live and how they talk to each other. Link out to
`docs/site/` pages rather than duplicating detail here; this section should
stay short enough to read in full every session.

## Conventions

- State code style rules here (comments policy, immutability, naming) once
  decided. Don't leave this as a placeholder in a real project, an assistant
  without stated conventions will guess, and guesses drift.
- Runtime validation: where does it belong (I/O boundaries only, or
  everywhere)?
- Testing taxonomy: what test types exist, what triggers each, where do
  they live.

## Things not to do

The corrections that would otherwise get relearned every session. Examples
of the shape (replace with real ones): "don't run the destructive migration
script outside a maintenance window", "don't auto-merge without a human
approval on schema changes".

## Where to look before asking

- Docs site: `docs/site/` (style guide, component kitchen sink, playbooks)
- CI: `.github/workflows/`
- Pre-commit gates: `.husky/pre-commit`
