import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "GeoTrap 3D — Platform Pembelajaran & Asesmen Literasi Matematika SMP",
  description:
    "Media pembelajaran interaktif 3D untuk keliling dan luas persegi panjang serta trapesium, dengan pre-test dan post-test literasi matematika.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${jetbrains.variable} font-sans text-slate-800 antialiased select-none`}>
        {children}
      </body>
    </html>
  );
}
