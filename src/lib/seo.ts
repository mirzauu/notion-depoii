export const SITE_URL = "https://www.depoii.com";
export const SITE_NAME = "Depoii";
export const SITE_TITLE = "Depoii | DFW Commercial Roofing Territory Intelligence";
export const SITE_DESCRIPTION =
  "Match your commercial roofing crew to the right DFW buildings, combining building size, roof age, recent weather exposure, and public work history before projects go to RFP.";
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

export function getLandingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
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
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
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
            url: `${SITE_URL}/#pricing`,
          },
          {
            "@type": "Offer",
            name: "Growth",
            price: "599",
            priceCurrency: "USD",
            url: `${SITE_URL}/#pricing`,
          },
          {
            "@type": "Offer",
            name: "Enterprise",
            price: "1299",
            priceCurrency: "USD",
            url: `${SITE_URL}/#pricing`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
