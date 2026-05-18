import Link from "next/link";

export const dynamic = "force-static";

export default function RootPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Image Converter</h1>
      <p className="text-sm text-neutral-600">
        Redirecting to the English version…
      </p>
      <Link className="text-sm underline" href="/en">
        Open converter
      </Link>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/en');",
        }}
      />
    </main>
  );
}
