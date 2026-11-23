import { faq, photos, site } from "@/lib/site";

export const seo = {
  title: "Револьвер Бульдог KURS — купить без лицензии",
  description:
    "Револьвер «Бульдог» KURS — КСОИ, не оружие. Сталь, 740 г, 6 зарядов, резиновый шар 10 мм. Без лицензии и регистрации по сертификату. Цена и доставка — в Telegram.",
  keywords:
    "револьвер бульдог курс, бульдог курс купить, револьвер бульдог KURS, ксои бульдог, бульдог курс без лицензии, резиновые шары 10 мм, монтажный патрон 5.6/16",
};

export function resolveOrigin(requestUrl?: URL | string): string {
  const fixed = site.url.trim().replace(/\/$/, "");
  if (fixed) return fixed;
  if (!requestUrl) return "";
  try {
    const url = typeof requestUrl === "string" ? new URL(requestUrl) : requestUrl;
    return url.origin;
  } catch {
    return "";
  }
}

/** Public origin behind a proxy. `site.url` always wins. */
export function originFromRequest(request: Request): string {
  const fixed = site.url.trim().replace(/\/$/, "");
  if (fixed) return fixed;
  const forwarded = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (forwarded) {
    const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
    return `${proto}://${forwarded}`;
  }
  return resolveOrigin(request.url);
}

export function absoluteUrl(origin: string, path = "/"): string {
  const base = origin.replace(/\/$/, "");
  if (!base) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLd(origin: string): string {
  const pageUrl = absoluteUrl(origin, "/");
  const images = photos.map((photo) => absoluteUrl(origin, photo.src));
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${pageUrl}#org`,
      name: site.brand,
      url: pageUrl,
      sameAs: [site.telegram],
      areaServed: "RU",
    },
    {
      "@type": "WebSite",
      "@id": `${pageUrl}#website`,
      url: pageUrl,
      name: site.brand,
      inLanguage: "ru-RU",
      publisher: { "@id": `${pageUrl}#org` },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${pageUrl}#website` },
      about: { "@id": `${pageUrl}#product` },
      primaryImageOfPage: images[0],
    },
    {
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: site.product,
      description: seo.description,
      image: images,
      brand: { "@type": "Brand", name: "KURS" },
      category: "КСОИ",
      countryOfOrigin: "RU",
      material: "Сталь, сплав ZAMAK 5",
      sku: "KURS-BULLDOG",
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 18,
      },
      ...(site.priceRub == null
        ? {}
        : {
            offers: {
              "@type": "Offer",
              url: site.telegram,
              priceCurrency: "RUB",
              price: site.priceRub,
              availability: "https://schema.org/InStock",
              areaServed: "RU",
            },
          }),
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: "ru-RU",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}

export function metrikaSnippet(id: string): string {
  return `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${JSON.stringify(id)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`;
}

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

type LinkTag = { rel: string; href: string; as?: string };

type ScriptTag = { type?: string; children: string };

export function pageHead(origin: string): {
  meta: MetaTag[];
  links: LinkTag[];
  scripts: ScriptTag[];
} {
  const meta: MetaTag[] = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "keywords", content: seo.keywords },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1",
    },
    { name: "yandex", content: "index, follow" },
    { name: "author", content: site.brand },
    { name: "theme-color", content: "#0c0d0b" },
  ];

  if (site.yandexVerification.trim()) {
    meta.push({
      name: "yandex-verification",
      content: site.yandexVerification.trim(),
    });
  }

  const links: LinkTag[] = [
    { rel: "preload", href: photos[0].src, as: "image" },
  ];
  if (origin) {
    links.unshift({ rel: "canonical", href: absoluteUrl(origin, "/") });
  }

  const scripts: ScriptTag[] = [];
  if (site.metrikaId.trim()) {
    scripts.push({ children: metrikaSnippet(site.metrikaId.trim()) });
  }

  return { meta, links, scripts };
}
