import { createFileRoute } from "@tanstack/react-router";
import { renderSitemap } from "@/lib/sitemap";
import { originFromRequest } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(renderSitemap(originFromRequest(request)), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
            "x-robots-tag": "noindex",
          },
        });
      },
    },
  },
});
