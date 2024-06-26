import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { AuthContextProvider } from "@/context/auth-context";
import { cn } from "@/lib/utils";

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
        <AuthContextProvider>
        <html lang="pt-BR">
          <body className={cn(roboto.className)}>
            <div className="flex h-full max-w-full">
              <div className="flex flex-col w-full h-full">
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              </ThemeProvider>
              </div>
            </div>
          </body>
          </html>
        </AuthContextProvider>
    
  )
}