import type { Metadata } from "next";
import { Inter, Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Выбери тариф",
  description: "Выберите подходящий тариф",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${bebasNeue.variable} ${montserrat.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
