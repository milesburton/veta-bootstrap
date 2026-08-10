import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";

// Points the docs site's live component demos (kitchen sink) at your app's
// real source, so a demo importing a component fails the docs build if the
// component itself breaks. Change this if your app lives somewhere other
// than a top-level frontend/src/.
const frontendSrc = fileURLToPath(
  new URL("../../frontend/src", import.meta.url),
);

// GitHub Pages project sites need a base path matching the repo name
// (https://<user>.github.io/<repo>/); a custom domain or root deploy target
// should set this to "/". Get this wrong and every base-relative asset
// (favicon, logo, internal links) 404s on the deployed site even though
// the build succeeds locally, since the dev server ignores base mismatches.
const docsBase = "/veta-bootstrap";

const docsNodeModules = fileURLToPath(
  new URL("./node_modules", import.meta.url),
);

const docsData = fileURLToPath(new URL("./src/data", import.meta.url));
const docsComponents = fileURLToPath(
  new URL("./src/components", import.meta.url),
);

export default defineConfig({
  site: "https://your-username.github.io",
  base: docsBase,
  vite: {
    resolve: {
      alias: {
        "@app/frontend": frontendSrc,
        "@docs/data": docsData,
        "@docs/components": docsComponents,
        react: `${docsNodeModules}/react`,
        "react-dom": `${docsNodeModules}/react-dom`,
      },
    },
  },
  integrations: [
    react(),
    starlight({
      title: "Project Docs",
      description: "Replace this with a real description in astro.config.mjs.",
      social: [],
      logo: {
        alt: "Project",
        src: "./src/assets/logo.svg",
      },
      editLink: {
        baseUrl: "https://github.com/your-username/your-repo/edit/main/docs/site/",
      },
      sidebar: [
        {
          label: "Getting Started",
          items: [{ label: "Overview", slug: "guides/overview" }],
        },
        {
          label: "Development",
          items: [
            { label: "Style guide", slug: "development/style-guide" },
            { label: "Component kitchen sink", slug: "development/components" },
            {
              label: "Component dependency graph",
              slug: "development/components/component-dependency-graph",
            },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
