import type { Metadata } from "next";
import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { ThemeProvider } from "@mui/material";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ClientLayout from "./layout.client";
import muiTheme from "./themes/mui";
import { UserProvider } from "./hooks/use-user";

const fontSans = Outfit({
  // Google Font
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EduVerse",
  description: "Streamlining educational institution management with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.className} ${geistMono.variable} antialiased`}
      >
        {/* 3rd party cookies provider to maintain cookies */}
        <CookiesProvider>
          {/* Wrapped with client layout */}
          {/* Mui Serverside theme caching */}
          <AppRouterCacheProvider>
            <ThemeProvider theme={muiTheme}>
              {/* Antd CSS in JS */}
              <AntdRegistry>
                <ClientLayout>
                  <UserProvider>
                    {/* Children Route */}
                    {children}
                  </UserProvider>
                </ClientLayout>
              </AntdRegistry>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
