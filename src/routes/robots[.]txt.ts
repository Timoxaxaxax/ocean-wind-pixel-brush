import { createFileRoute } from "@tanstack/react-router";
import { renderRobots } from "@/lib/sitemap";
import { originFromRequest } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(renderRobots(originFromRequest(request)), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
