import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/provider";
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
export const metadata: Metadata = {
  title: "Private Chat | Secure & Ephemeral Messaging",
  description: "A secure, real-time private chat application with self-destructing rooms and messages. No logs, no traces.",
  applicationName: "Private Chat",
  keywords: ["chat", "private", "secure", "encrypted", "ephemeral", "messaging", "real-time"],
  openGraph: {
    title: "Private Chat | Secure & Ephemeral Messaging",
    description: "Start a secure conversation that disappears forever when you're done.",
    type: "website",
    siteName: "Private Chat",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Chat | Secure & Ephemeral Messaging",
    description: "Start a secure conversation that disappears forever when you're done.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
