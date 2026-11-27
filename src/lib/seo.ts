import type { Metadata } from "next";

export const SITE_URL = "https://www.depoii.com";
export const SITE_NAME = "Depoii";
export const SITE_TITLE = "Depoii | DFW Commercial Roofing Territory Intelligence";
export const SITE_DESCRIPTION =
  "Match your commercial roofing crew to DFW buildings using roof age, square footage, storm exposure, and permit history before jobs go to RFP.";
export const OG_IMAGE_PATH = "/landing/hero-roof.jpg";

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "How does Depoii pick buildings that fit our crew?",
    answer:
      "You set your sweet spot: target square footage, DFW corridors, and preferred roof systems like TPO, EPDM, modified bitumen, or coatings. Depoii filters out out-of-scope small retail and surfaces the commercial roofs matching your crew with a real lifecycle or storm timing trigger.",
  },
  {
    question: "How is this different from a parcel list or permit alert service?",
    answer:
      "By the time a municipal roofing permit is filed, another contractor already won the job. Raw parcel exports give you tens of thousands of addresses with zero urgency. Depoii surfaces aging or storm-exposed commercial roofs that have no active replacement underway, backed by clear county and weather records.",
  },
  {
    question: "What do we get in our 10-Roof Territory Brief?",
    answer:
      "You tell us your company name, primary DFW corridors, and target building size. Within 24 hours, we send a walk-sheet of 10 commercial buildings in your sweet spot with square footage, estimated roof age, storm exposure, owner entity details, and source citations.",
  },
  {
    question: "How do claim locks and territory locks work?",
    answer:
      "Starter lets solo estimators and reps search and work DFW opportunities with 300 monthly credits and no lock. Growth adds 1,000 monthly credits and a 27-day claim lock on individual properties your crew is pursuing. Enterprise includes 2,500 monthly credits, full Depoii AI Intelligence, 10 seats, direct priority support, and 1 Exclusive Territory Lock for your corridor.",
  },
];

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  imagePath?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const imagePath = input.imagePath ?? OG_IMAGE_PATH;
  const imageAlt =
    input.imageAlt ?? "Depoii Commercial Roofing Territory Intelligence";
  const type = input.type ?? "website";

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: input.path,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: input.path,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      images: [
        {
          url: imagePath,
          width: 1280,
          height: 720,
          alt: imageAlt,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime ?? input.publishedTime,
            authors: input.authors ?? [SITE_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imagePath],
    },
  };
}

export function buildOrganizationNode(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    email: "hello@depoii.com",
    description: SITE_DESCRIPTION,
    areaServed: {
      "@type": "Place",
      name: "Dallas-Fort Worth, North Texas",
    },
  };
}

export function buildWebSiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildWebPageJsonLd(opts: {
  path: string;
  title: string;
  description: string;
  dateModified?: string;
  breadcrumbId?: string;
}): Record<string, unknown> {
  const fullUrl = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    "@type": "WebPage",
    "@id": `${fullUrl}#webpage`,
    url: fullUrl,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.breadcrumbId ? { breadcrumb: { "@id": opts.breadcrumbId } } : {}),
  };
}

export function buildServiceJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}): Record<string, unknown> {
  const fullUrl = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    "@type": "Service",
    "@id": `${fullUrl}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: fullUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Place",
      name: opts.areaServed ?? "Dallas-Fort Worth, North Texas",
    },
  };
}

export function buildArticleJsonLd(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imagePath?: string;
  keywords?: string[];
}): Record<string, unknown> {
  const fullUrl = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  const imageUrl = `${SITE_URL}${opts.imagePath ?? OG_IMAGE_PATH}`;
  return {
    "@type": "Article",
    "@id": `${fullUrl}#article`,
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { "@id": `${fullUrl}#webpage` },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Organization",
      name: opts.authorName ?? SITE_NAME,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: [imageUrl],
    ...(opts.keywords && opts.keywords.length > 0
      ? { keywords: opts.keywords.join(", ") }
      : {}),
  };
}

export function buildDatasetJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  spatialCoverage?: string;
  temporalCoverage?: string;
  variableMeasured?: string[];
}): Record<string, unknown> {
  const fullUrl = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    "@type": "Dataset",
    "@id": `${fullUrl}#dataset`,
    name: opts.name,
    description: opts.description,
    url: fullUrl,
    creator: { "@id": `${SITE_URL}/#organization` },
    spatialCoverage: {
      "@type": "Place",
      name: opts.spatialCoverage ?? "Dallas County, Texas",
    },
    ...(opts.temporalCoverage ? { temporalCoverage: opts.temporalCoverage } : {}),
    ...(opts.variableMeasured ? { variableMeasured: opts.variableMeasured } : {}),
  };
}

export function buildBreadcrumbListJsonLd(
  items: { name: string; path: string }[],
  pathForId = "/"
): Record<string, unknown> {
  const fullUrl = `${SITE_URL}${pathForId === "/" ? "" : pathForId}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${fullUrl}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

export function buildFaqPageJsonLd(
  faqs: FAQItem[],
  pathForId = "/"
): Record<string, unknown> {
  const baseUrl = `${SITE_URL}${pathForId === "/" ? "" : pathForId}`;
  return {
    "@type": "FAQPage",
    "@id": `${baseUrl}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function composeJsonLdGraph(
  nodes: Record<string, unknown>[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function getLandingJsonLd() {
  return composeJsonLdGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "249",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
        {
          "@type": "Offer",
          name: "Growth",
          price: "599",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
        {
          "@type": "Offer",
          name: "Enterprise",
          price: "1299",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
      ],
    },
    buildFaqPageJsonLd(FAQS, "/"),
  ]);
}
