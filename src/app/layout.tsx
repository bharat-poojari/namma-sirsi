import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/noto-serif-kannada/400.css";
import "@fontsource/noto-serif-kannada/700.css";
import "@fontsource/noto-sans-kannada/400.css";
import "@fontsource/noto-sans-kannada/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAMMA SIRSI · ನಮ್ಮ ಶಿರಸಿ",
  description:
    "An immersive, scroll-driven 3D journey through Sirsi, Uttara Kannada: Kadamba heritage, Marikamba, the Western Ghats, Yakshagana, Havyaka food and the people of Sirsi. In English and Kannada.",
  openGraph: {
    title: "NAMMA SIRSI · ನಮ್ಮ ಶಿರಸಿ",
    description: "A cinematic 3D journey through Sirsi and the Western Ghats of Uttara Kannada.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06130e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
