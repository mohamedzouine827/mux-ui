import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mux UI",
  description: "Mux UI is a Next.js-based UI library that offers sleek, animated components to enhance your web projects.",
  keywords: "UI library, animated components, Next.js, Mux UI, web design, UX, animations",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Mux UI",
    description: "Explore Mux UI, a UI library that provides beautifully animated components for your Next.js projects.",
    url: "https://mux-ui.vercel.app/",
    type: "website",
  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Mux UI is a Next.js-based UI library that offers sleek, animated components to enhance your web projects." />
        <meta name="keywords" content="UI library, animated components, Next.js, Mux UI, web design, UX, animations" />
        <meta property="og:title" content="Mux UI" />
        <meta property="og:description" content="Explore Mux UI, a UI library that provides beautifully animated components for your Next.js projects." />
        <meta property="og:url" content="https://mux-ui.vercel.app/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mux-ui.vercel.app/" />
        <title>Mux UI</title>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
