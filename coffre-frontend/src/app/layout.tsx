import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { AuthContextProvider } from "@/context/auth-context";
import Sidebar from "@/components/sidebar";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffre | Login",
  description: "Sua chave para o controle eficiente!",
  icons: {
    icon: ['/favicon.ico'],
    shortcut: ['/apple-touch-icon.png'],
    apple: ['/apple-touch-icon.png']
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthContextProvider>
          <body className={roboto.className}>
            <div className="flex ml-64 p-4">
            {children}
            </div>
            </body>
        </AuthContextProvider>
      </ThemeProvider>
    </html>
  );
}