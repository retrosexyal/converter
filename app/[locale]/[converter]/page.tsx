import FaqSchema from "@/components/FaqSchema";
import UploadForm from "@/components/UploadForm";
import YandexAdSlot from "@/components/YandexAdSlot";
import { DICTIONARY, Locale } from "@/dictionary";
import { FAQ } from "@/lib/faq";
import { getConverterPageContent } from "@/lib/converterPageContent";
import { absoluteUrl, alternateLanguages, SITE_URL } from "@/lib/seo";
import { CONVERTER_SEO, SEO_PAGES, SEO_PAGE_SLUGS } from "@/lib/seoPageData";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = Object.keys(DICTIONARY);
type ConverterType = keyof typeof DICTIONARY.en.converters;

export async function generateStaticParams() {
  const converterParams = locales.flatMap((locale) =>
    Object.keys(DICTIONARY[locale as Locale].converters).map((converter) => ({
      locale,
      converter,
    })),
  );

  return [
    ...converterParams,
    ...SEO_PAGE_SLUGS.map((converter) => ({ locale: "en", converter })),
  ];
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; converter: string }>;
}): Promise<Metadata> {
  const { locale, converter: converterQuery } = await params;

  const converter = converterQuery as ConverterType;

  const dict = DICTIONARY[locale as Locale];

  if (!dict) notFound();

  if (locale === "en" && converter in SEO_PAGES) {
    const page = SEO_PAGES[converter];

    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: {
        canonical: absoluteUrl(`/${locale}/${converter}`),
      },
      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: absoluteUrl(`/${locale}/${converter}`),
      },
    };
  }

  if (!(converter in dict.converters)) notFound();

  const page = dict.converters[converter as keyof typeof dict.converters];
  const seo = locale === "en" ? CONVERTER_SEO[converter] : undefined;
  const title = seo?.metaTitle ?? page.metaTitle;
  const description = seo?.metaDescription ?? page.metaDescription;

  return {
    title,
    description,
      alternates: {
        canonical: absoluteUrl(`/${locale}/${converter}`),
        languages: alternateLanguages(locales, (l) =>
          absoluteUrl(`/${l}/${converter}`),
        ),
      },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${locale}/${converter}`),
    },
  };
}

function withLocale(href: string, locale: string) {
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

function ApplicationSchema({
  name,
  url,
  featureList,
  type = "WebApplication",
}: {
  name: string;
  url: string;
  featureList: string[];
  type?: "WebApplication" | "SoftwareApplication";
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": type,
          name,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Web browser",
          url,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList,
        }),
      }}
    />
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; converter: string }>;
}) {
  const { locale, converter: converterQuery } = await params;

  const dict = DICTIONARY[locale as Locale];

  const converter = converterQuery as ConverterType;

  if (!dict) notFound();

  if (locale === "en" && converterQuery in SEO_PAGES) {
    const seoPage = SEO_PAGES[converterQuery];

    return (
      <>
        <FaqSchema faqs={seoPage.faqs} />

        <article className="content-article max-w-none">
          <h1>{seoPage.h1}</h1>
          <p>{seoPage.intro}</p>

          <h2>Key benefits</h2>
          <ul>
            {seoPage.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <h2>Relevant tools</h2>
          <ul>
            {seoPage.converterLinks.map((link) => (
              <li key={link.href}>
                <Link href={withLocale(link.href, locale)}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {seoPage.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.links && (
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={withLocale(link.href, locale)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <h2>FAQ</h2>
          <ul>
            {seoPage.faqs.map((faq) => (
              <li key={faq.question}>
                <strong>{faq.question}</strong>
                <br />
                {faq.answer}
              </li>
            ))}
          </ul>
        </article>

        {seoPage.schemaType === "WebPage" ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: seoPage.schemaName,
                url: `${SITE_URL}/${locale}/${seoPage.slug}`,
              }),
            }}
          />
        ) : (
          <ApplicationSchema
            name={seoPage.schemaName}
            url={`${SITE_URL}/${locale}/${seoPage.slug}`}
            featureList={seoPage.benefits}
            type={seoPage.schemaType}
          />
        )}
      </>
    );
  }

  if (!(converter in dict.converters)) notFound();

  const page = dict.converters[converter as keyof typeof dict.converters];

  const faqs = FAQ.base[locale as Locale];
  const content = getConverterPageContent(converter, locale as Locale);
  const seo = locale === "en" ? CONVERTER_SEO[converter] : undefined;
  const featureList =
    seo?.featureList ?? [
      `Convert ${page.title}`,
      "Batch image conversion",
      "Browser-based processing where supported",
      "No registration required",
    ];

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex flex-col gap-10">
        <UploadForm
          title={page.title}
          defaultFormat={converter.split("-to-")[1]}
          hideFormatSelect
          locale={locale as Locale}
        />

        <YandexAdSlot placement={`converter-${converter}-after-form`} />

        <article className="content-article max-w-none">
          <h1>{page.h1}</h1>
          <p>{page.description}</p>

          <h2>{content.introTitle}</h2>
          <p>{content.introText}</p>

          <h2>{content.stepsTitle}</h2>
          <ol>
            {content.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2>{content.formatTitle}</h2>
          <div className="overflow-x-auto">
            <table>
              <tbody>
                {content.rows.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>{content.bestForTitle}</h2>
          <ul>
            {content.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{content.qualityTitle}</h2>
          <p>{content.qualityText}</p>

          <h2>{content.privacyTitle}</h2>
          <p>{content.privacyText}</p>

          <h2>{content.tipsTitle}</h2>
          <ul>
            {content.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          {content.extraSections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {seo?.relatedConverters && (
            <>
              <h2>Related converters</h2>
              <ul>
                {seo.relatedConverters.map((link) => (
                  <li key={link.href}>
                    <Link href={withLocale(link.href, locale)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2>{content.faqTitle}</h2>
          <ul>
            {faqs.map((f) => (
              <li key={f.question}>
                <strong>{f.question}</strong>
                <br />
                {f.answer}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: locale.toUpperCase(),
                item: `${SITE_URL}/${locale}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: page.h1,
                item: `${SITE_URL}/${locale}/${converter}`,
              },
            ],
          }),
        }}
      />
      <ApplicationSchema
        name={page.h1}
        url={`${SITE_URL}/${locale}/${converter}`}
        featureList={featureList}
        type="WebApplication"
      />
    </>
  );
}
