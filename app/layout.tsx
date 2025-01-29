import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Nav from "./components/Navbar";
import ContactsSection from "./components/ContactsSection";
import FloatingButton from "./components/FloatingButton";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// Import Brandon Grotesque
const brandonGrotesque = localFont({
  src: [
    {
      path: './fonts/Brandon Grotesque Web Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-brandon-grotesque',
  display: 'swap',
})
// Import Selvia Genatu
const selviaGenatu = localFont({
  src: [
    {
      path: './fonts/selviagenatu-medium.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/selviagenatu-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/selviagenatu-medium.otf',
      weight: '700',
      style: 'normal',
    },
    // Add more variations as needed
  ],
  variable: '--font-selvia-genatu',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Royale Emelina - Naga City',
  description: 'Experience extraordinary elegance at Royale Emelina. Perfect for weddings, corporate events, and celebrations. Book your unforgettable event today!',
  keywords: 'event center, wedding venue, corporate events, celebrations, birthday parties, Royale Emelina, Naga City',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${brandonGrotesque.variable} ${selviaGenatu.variable} ${inter.variable}`}>
      <body className={`font-body`}>
          <main>
            <Nav />
            {children}
          </main>
          <ContactsSection />
          <FloatingButton />
          <Footer/>
      </body>
    </html>
  );
}
