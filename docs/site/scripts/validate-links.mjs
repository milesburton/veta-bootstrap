import { readFile, glob } from "node:fs/promises";
import { resolve, posix } from "node:path";
import { existsSync } from "node:fs";
import process from "node:process";

const DIST = resolve(import.meta.dirname, "../dist");

if (!existsSync(DIST)) {
  console.error(`dist not found at ${DIST}; run \`npm run build\` first.`);
  process.exit(1);
}

// Detect the base path from the built sitemap rather than importing
// astro.config.mjs directly, since that file imports Astro/Starlight packages
// that plain `node` (outside Astro's own toolchain) cannot load, so
// importing it here breaks under stricter Node versions. The sitemap's
// <loc> entries always include the real base path.
async function detectBase() {
  const sitemapPath = resolve(DIST, "sitemap-index.xml");
  if (!existsSync(sitemapPath)) return "";
  try {
    const raw = await readFile(sitemapPath, "utf8");
    const m = raw.match(/https?:\/\/[^/]+(\/[^<]*?)sitemap-\d+\.xml/);
    return m ? m[1].replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}

const BASE = await detectBase();

const HREF_RE = /<(?:a|link)\b[^>]*\bhref="([^"#?]*)(?:#([^"]*))?"/gi;
const SRC_RE = /<(?:img|script|source)\b[^>]*\bsrc="([^"?]*)"/gi;

function isExternal(url) {
  return /^(https?:|mailto:|tel:|data:|javascript:|#)/.test(url);
}

function distPath(href, fromPage) {
  if (BASE && href.startsWith(BASE + "/")) {
    return DIST + href.slice(BASE.length);
  }
  if (href.startsWith("/")) {
    return DIST + href;
  }
  return DIST + posix.resolve(fromPage, href);
}

function targetExists(fsPath) {
  if (existsSync(fsPath)) return true;
  if (fsPath.endsWith("/")) {
    return existsSync(fsPath + "index.html");
  }
  return existsSync(fsPath + "/index.html") || existsSync(fsPath + ".html");
}

async function loadFragmentIds(fsPath) {
  const candidates = [fsPath, fsPath + "index.html", fsPath + "/index.html", fsPath + ".html"];
  for (const c of candidates) {
    let html;
    try {
      html = await readFile(c, "utf8");
    } catch {
      continue;
    }
    const ids = new Set();
    for (const m of html.matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
    return ids;
  }
  return null;
}

const failures = [];
let totalLinks = 0;
const files = [];
for await (const entry of glob("**/*.html", { cwd: DIST })) files.push(entry);
files.sort();

for (const rel of files) {
  const full = `${DIST}/${rel}`;
  const html = await readFile(full, "utf8");
  const pageUrl = "/" + rel.replace(/index\.html$/, "");

  const checks = [];
  for (const m of html.matchAll(HREF_RE)) checks.push({ href: m[1], frag: m[2], kind: "href" });
  for (const m of html.matchAll(SRC_RE)) checks.push({ href: m[1], frag: null, kind: "src" });

  for (const c of checks) {
    if (!c.href && !c.frag) continue;
    if (isExternal(c.href)) continue;
    totalLinks++;

    if (!c.href) {
      const ids = await loadFragmentIds(full);
      if (ids && !ids.has(c.frag)) {
        failures.push({ src: rel, link: `#${c.frag}`, reason: "anchor not found on same page" });
      }
      continue;
    }

    const fsPath = distPath(c.href, pageUrl);
    if (!targetExists(fsPath)) {
      failures.push({ src: rel, link: c.href, reason: `target not found: ${fsPath.slice(DIST.length)}` });
      continue;
    }

    if (c.frag) {
      const ids = await loadFragmentIds(fsPath);
      if (ids && !ids.has(c.frag)) {
        failures.push({ src: rel, link: `${c.href}#${c.frag}`, reason: `anchor #${c.frag} not on target page` });
      }
    }
  }
}

console.log(`Checked ${totalLinks} internal link(s) across ${files.length} HTML file(s)`);
if (failures.length > 0) {
  console.error(`\n${failures.length} broken link(s):\n`);
  for (const f of failures) {
    console.error(`  ${f.src}  ->  ${f.link}  (${f.reason})`);
  }
  process.exit(1);
}
