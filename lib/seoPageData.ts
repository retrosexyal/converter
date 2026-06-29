import type { FaqItem } from "@/lib/faq";
import { CONTACT_EMAIL } from "@/lib/legalContent";

export type SeoLink = {
  href: string;
  label: string;
};

export type SeoSection = {
  title: string;
  body?: string[];
  bullets?: string[];
  links?: SeoLink[];
};

export type SeoPageData = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefits: string[];
  converterLinks: SeoLink[];
  sections: SeoSection[];
  faqs: FaqItem[];
  schemaName: string;
  schemaType: "WebApplication" | "SoftwareApplication" | "WebPage";
};

export type ConverterSeo = {
  metaTitle: string;
  metaDescription: string;
  featureList: string[];
  relatedConverters: SeoLink[];
};

export const CONTENT_LAST_MODIFIED = new Date("2026-06-24T00:00:00.000Z");

export const CONVERTER_SEO: Record<string, ConverterSeo> = {
  "webp-to-jpeg": {
    metaTitle: "WebP to JPG Converter Online - Free, No Upload, Batch",
    metaDescription:
      "Convert WebP to JPG in your browser. Free WebP to JPEG converter with batch ZIP download, no registration, and local file processing where supported.",
    featureList: [
      "Convert WebP to JPG",
      "Batch image conversion",
      "Local browser processing where supported",
      "No registration required",
    ],
    relatedConverters: [
      { href: "/webp-to-png", label: "Convert WebP to PNG" },
      { href: "/webp-to-pdf", label: "Convert WebP to PDF" },
      { href: "/webp-to-avif", label: "Convert WebP to AVIF" },
      { href: "/png-to-webp", label: "Convert PNG to WebP" },
    ],
  },
  "webp-to-png": {
    metaTitle: "WebP to PNG Converter - Keep Transparency, No Upload",
    metaDescription:
      "Convert WebP to PNG online in your browser. Preserve transparency, batch convert files, and download PNG results without registration.",
    featureList: [
      "Convert WebP to PNG",
      "Preserve transparent backgrounds",
      "Batch image conversion",
      "No registration required",
    ],
    relatedConverters: [
      { href: "/webp-to-jpeg", label: "Convert WebP to JPG" },
      { href: "/webp-to-pdf", label: "Convert WebP to PDF" },
      { href: "/png-to-webp", label: "Convert PNG to WebP" },
      { href: "/image-to-ico", label: "Create favicon ICO" },
    ],
  },
  "png-to-webp": {
    metaTitle: "PNG to WebP Converter - Compress Images Online, No Upload",
    metaDescription:
      "Convert PNG to WebP online in your browser. Keep transparency, reduce image size, batch convert files, and download everything as a ZIP.",
    featureList: [
      "Convert PNG to WebP",
      "Keep transparency where WebP output is supported",
      "Batch image conversion",
      "Local browser processing where supported",
    ],
    relatedConverters: [
      { href: "/webp-to-png", label: "Convert WebP to PNG" },
      { href: "/png-to-jpeg", label: "Convert PNG to JPG" },
      { href: "/png-to-pdf", label: "Convert PNG to PDF" },
      { href: "/image-to-ico", label: "Create favicon ICO" },
    ],
  },
  "heic-to-jpeg": {
    metaTitle: "HEIC to JPG Converter - Convert iPhone Photos Online",
    metaDescription:
      "Convert HEIC photos from iPhone to JPG online. Fast browser-based HEIC to JPEG conversion with no registration where your browser supports the file.",
    featureList: [
      "Convert HEIC to JPG",
      "Prepare iPhone photos for sharing",
      "No registration required",
      "Browser-based conversion where supported",
    ],
    relatedConverters: [
      { href: "/heic-to-png", label: "Convert HEIC to PNG" },
      { href: "/heic-to-webp", label: "Convert HEIC to WebP" },
      { href: "/heic-to-pdf", label: "Convert HEIC to PDF" },
      { href: "/jpeg-to-pdf", label: "Convert JPG to PDF" },
    ],
  },
  "image-to-ico": {
    metaTitle: "Image to ICO Converter - Create Favicon Files Online",
    metaDescription:
      "Convert PNG, JPG, or WebP images to ICO favicon files. Create browser-ready icons for websites and apps with no registration.",
    featureList: [
      "Convert images to ICO",
      "Create favicon files",
      "Generate browser-ready icons",
      "No registration required",
    ],
    relatedConverters: [
      { href: "/png-to-webp", label: "Convert PNG to WebP" },
      { href: "/webp-to-png", label: "Convert WebP to PNG" },
      { href: "/jpeg-to-png", label: "Convert JPG to PNG" },
      { href: "/favicon-generator", label: "Favicon generator" },
    ],
  },
  "webp-to-pdf": {
    metaTitle: "WebP to PDF Converter - Multiple Images to PDF Online",
    metaDescription:
      "Convert WebP images to PDF online. Make a PDF from one or more images in your browser and download the result without registration.",
    featureList: [
      "Convert WebP to PDF",
      "Create PDFs from images",
      "Batch image conversion",
      "No registration required",
    ],
    relatedConverters: [
      { href: "/image-to-pdf", label: "Convert images to PDF" },
      { href: "/jpeg-to-pdf", label: "Convert JPG to PDF" },
      { href: "/png-to-pdf", label: "Convert PNG to PDF" },
      { href: "/webp-to-jpeg", label: "Convert WebP to JPG" },
    ],
  },
};

const PRIVACY_FAQ = {
  question: "Are files uploaded to a server?",
  answer:
    "FormatKit is designed for browser-based conversion where supported. Some formats depend on browser capabilities, and the privacy page explains current limitations.",
};

export const SEO_PAGES: Record<string, SeoPageData> = {
  "batch-image-converter": {
    slug: "batch-image-converter",
    metaTitle: "Batch Image Converter Online - ZIP Download, No Registration",
    metaDescription:
      "Convert multiple images online in one batch. Choose JPG, PNG, WebP, PDF or ICO output and download converted files as a ZIP.",
    h1: "Batch image converter",
    intro:
      "Convert several images in one browser session, then download the results together. This is useful for product photos, website assets, screenshots and small image sets that need the same output format.",
    benefits: [
      "Convert up to 20 images per batch.",
      "Download multiple results as a ZIP file.",
      "Use JPG, PNG, WebP, AVIF, PDF or ICO output where supported.",
      "No account is required for everyday conversion tasks.",
    ],
    converterLinks: [
      { href: "/png-to-webp", label: "Batch convert PNG to WebP" },
      { href: "/webp-to-jpeg", label: "Batch convert WebP to JPG" },
      { href: "/jpeg-to-pdf", label: "Convert JPG images to PDF" },
      { href: "/webp-to-pdf", label: "Convert WebP images to PDF" },
    ],
    sections: [
      {
        title: "When batch conversion helps",
        body: [
          "Batch conversion is best when every selected file should use the same output format. It saves time when preparing website images, compressing exported design assets or turning a group of screenshots into files your workflow accepts.",
        ],
      },
      {
        title: "Limits and practical tips",
        bullets: [
          "Keep each file under the current size limit shown by the converter.",
          "Use WebP for smaller website images, PNG for transparency and JPEG for broad compatibility.",
          "Check a few converted files before replacing originals in production.",
        ],
      },
    ],
    faqs: [
      PRIVACY_FAQ,
      {
        question: "Why do I get a ZIP file?",
        answer:
          "When more than one file is converted, FormatKit packages the results into a ZIP so every output file can be downloaded together.",
      },
    ],
    schemaName: "Batch Image Converter",
    schemaType: "WebApplication",
  },
  "convert-images-in-browser": {
    slug: "convert-images-in-browser",
    metaTitle: "Convert Images in Browser - Local Image Converter",
    metaDescription:
      "Convert images in your browser with FormatKit. Prepare JPG, PNG, WebP, AVIF, PDF and ICO files without registration.",
    h1: "Convert images in your browser",
    intro:
      "FormatKit focuses on browser-based image conversion where the current browser supports decoding and export. It is a practical choice when you want a quick file conversion without installing desktop software.",
    benefits: [
      "Designed for local processing where browser APIs support the format.",
      "No registration or project setup.",
      "Works for common image preparation tasks on desktop and mobile browsers.",
      "Useful for WebP, PNG, JPEG, AVIF, PDF and favicon workflows.",
    ],
    converterLinks: [
      { href: "/webp-to-jpeg", label: "Convert WebP to JPG" },
      { href: "/png-to-webp", label: "Convert PNG to WebP" },
      { href: "/image-to-ico", label: "Create favicon ICO" },
      { href: "/webp-to-pdf", label: "Convert images to PDF" },
    ],
    sections: [
      {
        title: "What browser-based means",
        body: [
          "The converter uses browser features such as image decoding, canvas export and client-side ZIP/PDF generation. If a browser cannot read a specific codec, the conversion may fail instead of silently sending the file elsewhere.",
        ],
      },
      {
        title: "Best formats for browser conversion",
        bullets: [
          "PNG and JPEG are the safest compatibility choices.",
          "WebP is usually a good balance of quality and file size.",
          "AVIF and HEIC support can vary by browser and operating system.",
        ],
      },
    ],
    faqs: [
      PRIVACY_FAQ,
      {
        question: "Does every format work in every browser?",
        answer:
          "No. Browser support varies for HEIC, AVIF, TIFF and some export formats. If one format fails, try PNG, JPEG or WebP.",
      },
    ],
    schemaName: "Browser Image Converter",
    schemaType: "WebApplication",
  },
  "favicon-generator": {
    slug: "favicon-generator",
    metaTitle: "Favicon Generator - Create ICO Icons from Images",
    metaDescription:
      "Create a website favicon from PNG, JPG or WebP images. Generate an ICO file for browser tabs, bookmarks and basic website use.",
    h1: "Favicon generator",
    intro:
      "Create a simple ICO favicon from a source image. Use it for browser tabs, bookmarks and older website integrations that still expect an .ico file.",
    benefits: [
      "Create an ICO favicon from common image formats.",
      "Prepare a browser-ready website icon.",
      "Use source logos, app icons or simplified graphics.",
      "No registration required.",
    ],
    converterLinks: [
      { href: "/image-to-ico", label: "Create favicon ICO" },
      { href: "/png-to-webp", label: "Convert PNG to WebP" },
      { href: "/jpeg-to-png", label: "Convert JPG to PNG" },
      { href: "/webp-to-png", label: "Convert WebP to PNG" },
    ],
    sections: [
      {
        title: "Favicon sizes",
        body: [
          "Classic ICO favicons often include 16x16, 32x32 and 48x48 versions. FormatKit creates a compact browser icon output suitable for basic favicon use.",
        ],
      },
      {
        title: "ICO vs PNG icons",
        body: [
          "PNG favicons are common in modern sites, but .ico remains useful for compatibility with older browsers, bookmarks and simple root-level favicon setup.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I use the favicon on a website?",
        answer:
          'Upload the generated favicon.ico file to your site and reference it with a link tag such as rel="icon" in the page head.',
      },
      PRIVACY_FAQ,
    ],
    schemaName: "Favicon Generator",
    schemaType: "WebApplication",
  },
  "image-to-pdf": {
    slug: "image-to-pdf",
    metaTitle: "Image to PDF Converter - JPG, PNG, WebP to PDF",
    metaDescription:
      "Convert images to PDF online. Turn JPG, PNG or WebP files into PDF documents in your browser without registration.",
    h1: "Image to PDF converter",
    intro:
      "Turn image files into PDF documents for sharing, printing or archiving. Use this when a recipient needs a document instead of separate image files.",
    benefits: [
      "Create PDF output from common image formats.",
      "Use PDF for receipts, scans, notes and visual documents.",
      "No account required.",
      "Designed for browser-based conversion where supported.",
    ],
    converterLinks: [
      { href: "/jpeg-to-pdf", label: "Convert JPG to PDF" },
      { href: "/png-to-pdf", label: "Convert PNG to PDF" },
      { href: "/webp-to-pdf", label: "Convert WebP to PDF" },
      { href: "/heic-to-pdf", label: "Convert HEIC to PDF" },
    ],
    sections: [
      {
        title: "When PDF is better",
        body: [
          "PDF is convenient for documents, print workflows and sharing a file that should keep its page layout. For website images, WebP, JPEG or PNG are usually better choices.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I convert multiple images to one PDF?",
        answer:
          "The current converter handles selected images and creates downloadable output. For large document assembly, check the result before deleting originals.",
      },
      PRIVACY_FAQ,
    ],
    schemaName: "Image to PDF Converter",
    schemaType: "WebApplication",
  },
  "iphone-photo-converter": {
    slug: "iphone-photo-converter",
    metaTitle: "iPhone Photo Converter - HEIC to JPG, PNG or PDF",
    metaDescription:
      "Convert iPhone HEIC photos to JPG, PNG, WebP or PDF online. Prepare compatible files without registration where browser support allows.",
    h1: "iPhone photo converter",
    intro:
      "iPhones often save photos as HEIC files. Convert them to JPEG, PNG, WebP or PDF when another app, website or document workflow needs a more common format.",
    benefits: [
      "Convert HEIC photos to widely supported formats.",
      "Use JPEG for sharing and compatibility.",
      "Use PDF for documents made from photos.",
      "No registration required.",
    ],
    converterLinks: [
      { href: "/heic-to-jpeg", label: "Convert HEIC to JPG" },
      { href: "/heic-to-png", label: "Convert HEIC to PNG" },
      { href: "/heic-to-webp", label: "Convert HEIC to WebP" },
      { href: "/heic-to-pdf", label: "Convert HEIC to PDF" },
    ],
    sections: [
      {
        title: "HEIC compatibility",
        body: [
          "HEIC support depends on browser and operating system capabilities. If a browser cannot decode an iPhone photo, try exporting it from the Photos app as JPEG first.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does a HEIC file fail to open?",
        answer:
          "Some browsers cannot decode HEIC files. The converter reports that limitation instead of inventing a server-side conversion path.",
      },
      PRIVACY_FAQ,
    ],
    schemaName: "iPhone Photo Converter",
    schemaType: "WebApplication",
  },
  about: {
    slug: "about",
    metaTitle: "About FormatKit - Browser Image Conversion Tools",
    metaDescription:
      "Learn what FormatKit is, who it is for, and which image conversion tools are available.",
    h1: "About FormatKit",
    intro:
      "FormatKit is a small collection of browser-focused image and video conversion tools for everyday file preparation.",
    benefits: [
      "Built for creators, developers, marketers and anyone preparing image files.",
      "Supports common conversion paths for JPG, PNG, WebP, AVIF, HEIC, PDF and ICO.",
      "Keeps the workflow simple: choose files, select output, download the result.",
    ],
    converterLinks: [
      { href: "/png-to-webp", label: "Convert PNG to WebP" },
      { href: "/webp-to-jpeg", label: "Convert WebP to JPG" },
      { href: "/image-to-ico", label: "Create favicon ICO" },
      { href: "/video", label: "Video converter" },
    ],
    sections: [
      {
        title: "Who it is for",
        body: [
          "FormatKit is useful when you need quick format changes for websites, email attachments, documents, icons or mobile photos without opening a full image editor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is FormatKit free to use?",
        answer:
          "Yes. The current tools can be used without creating an account.",
      },
    ],
    schemaName: "About FormatKit",
    schemaType: "WebPage",
  },
  contact: {
    slug: "contact",
    metaTitle: "Contact FormatKit",
    metaDescription:
      "Contact FormatKit for site questions, privacy requests, bug reports or conversion tool feedback.",
    h1: "Contact FormatKit",
    intro:
      "Use this page for site questions, privacy requests, bug reports and feedback about conversion tools.",
    benefits: [
      "Report broken conversion cases.",
      "Send privacy or data questions.",
      "Suggest formats or workflow improvements.",
    ],
    converterLinks: [
      { href: "/about", label: "About FormatKit" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/security", label: "Security" },
    ],
    sections: [
      {
        title: "Email",
        body: [`Contact: ${CONTACT_EMAIL}`],
      },
    ],
    faqs: [
      {
        question: "What should I include in a bug report?",
        answer:
          "Include the browser, operating system, input format, selected output format and the error message if one appears.",
      },
    ],
    schemaName: "Contact FormatKit",
    schemaType: "WebPage",
  },
  security: {
    slug: "security",
    metaTitle: "FormatKit Security - Browser-Based Conversion Limits",
    metaDescription:
      "Read how FormatKit approaches browser-based file processing, sensitive files and practical security limits.",
    h1: "Security",
    intro:
      "FormatKit is designed for practical browser-based conversion where supported, but users should still avoid processing sensitive documents in any web tool unless they understand the risks.",
    benefits: [
      "Use the converter for ordinary image preparation tasks.",
      "Avoid uploading confidential, regulated or highly sensitive files.",
      "Keep original files until you verify converted results.",
    ],
    converterLinks: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/contact", label: "Contact" },
      { href: "/convert-images-in-browser", label: "Convert images in browser" },
    ],
    sections: [
      {
        title: "Browser-based processing",
        body: [
          "Many image operations use browser capabilities such as canvas export and client-side archive generation. Support varies by file type, browser and device.",
        ],
      },
      {
        title: "Practical limitations",
        bullets: [
          "Do not use public web tools for files that require strict compliance handling.",
          "A failed conversion may mean the browser cannot decode or export that format.",
          "Third-party advertising or hosting infrastructure may still process standard technical data.",
        ],
      },
    ],
    faqs: [
      PRIVACY_FAQ,
      {
        question: "Should I convert sensitive documents here?",
        answer:
          "No. Use controlled internal tools for confidential, regulated or sensitive documents.",
      },
    ],
    schemaName: "FormatKit Security",
    schemaType: "WebPage",
  },
};

export const SEO_PAGE_SLUGS = Object.keys(SEO_PAGES);
