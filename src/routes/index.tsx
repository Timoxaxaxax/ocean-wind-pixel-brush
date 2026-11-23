import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { HomePage } from "@/components/landing/page";
import { pageHead, resolveOrigin } from "@/lib/seo";

const loadOrigin = createServerFn({ method: "GET" }).handler(async () => {
  const { getRequestUrl } = await import("@tanstack/react-start/server");
  return resolveOrigin(getRequestUrl({ xForwardedHost: true }));
});

export const Route = createFileRoute("/")({
  loader: () => loadOrigin(),
  head: ({ loaderData }) => pageHead(loaderData ?? ""),
  headers: () => ({
    "content-language": "ru",
    "x-robots-tag": "index, follow",
  }),
  component: Home,
});

function Home() {
  const origin = Route.useLoaderData();
  return <HomePage origin={origin} />;
}
