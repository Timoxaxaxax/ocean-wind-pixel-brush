import { photos } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

function escapeXml(value: string): string {
  const amp = String.fromCharCode(38);
  return value
    .replaceAll(amp, amp + "amp;")
    .replaceAll("<", amp + "lt;")
    .replaceAll(">", amp + "gt;")
    .replaceAll('"', amp + "quot;");
}

export function renderSitemap(origin: string): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const images = photos
    .map((photo) => {
      const loc = escapeXml(absoluteUrl(origin, photo.src));
      const title = escapeXml(photo.alt);
      return [
        "    <image:image>",
        `      <image:loc>${loc}</image:loc>`,
        `      <image:title>${title}</image:title>`,
        "    </image:image>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <url>",
    `    <loc>${escapeXml(absoluteUrl(origin, "/"))}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    "    <priority>1.0</priority>",
    images,
    "  </url>",
    "</urlset>",
    "",
  ].join("\n");
}

export function renderRobots(origin: string): string {
  const host = origin ? new URL(origin).host : "";
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /__grok/",
    "",
    "User-agent: Yandex",
    "Allow: /",
    "Disallow: /__grok/",
    "Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&utm_referrer&yclid&ysclid&fbclid&gclid",
  ];
  if (host) lines.push(`Host: ${host}`);
  lines.push(origin ? `Sitemap: ${absoluteUrl(origin, "/sitemap.xml")}` : "Sitemap: /sitemap.xml");
  lines.push("");
  return lines.join("\n");
}
