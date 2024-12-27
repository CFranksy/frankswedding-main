import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Chris and Emily Wedding",
  description:
    "This app is to give you all the knowledge and timings for Chris and Emilys wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href={"/thebarn.jpeg"} />
        <link rel="preload" as="image" href={"/meadow_barn.webp"} />
        <link rel="preload" as="image" href={"/proposal.webp"} />
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>

      <body className="">{children}</body>
    </html>
  );
}
