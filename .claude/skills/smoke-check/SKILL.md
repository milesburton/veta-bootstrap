---
name: smoke-check
description: Verify the running app actually works end to end after a change or deploy. Use whenever a change has been applied and you need to confirm the running app is healthy, not just that CI or unit tests passed. CI-green does not mean the app works.
---

# Smoke-check the running app

This is a template. Replace the layers below with the ones that matter for
this project (a database connection, a queue consumer, an auth flow), in
the order a failure would actually surface (a later layer rarely passes
when an earlier one is broken). Keep the "stop at the first failing layer"
discipline: it's what makes this fast to run and easy to read.

Walk the layers in order:

1. **Process is up.** Whatever confirms the app is running at all (a
   process list, a container status check).
2. **HTTP health check.** `curl -sf http://localhost:PORT/health` should
   return a 200 with a body that says the app considers itself healthy.
3. **The thing the app actually does.** Exercise its core function once
   (submit a form, call the primary API endpoint, load the main page) and
   check the response is real, not a cached/mocked/empty result.
4. **Logs.** Tail the process the change touched for crash loops, repeated
   errors, or reconnect storms in the seconds after the change landed.

Report per-layer what you ran and observed. Name any failing layer with its
exact output; do not declare the app healthy on the strength of CI. If you
skipped layers, say which and why.
