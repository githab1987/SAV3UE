import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Ali",
  description: "Audit keuangan & pajak Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: system-ui, -apple-system, sans-serif;
          }
        `}</style>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/tailwind.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
