import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deployer App",
  description: "You can deploy your react app here",
};

export default function RootLayout({children}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Provider>
        <main>
          {children}
        </main>
      </Provider>
      </body>
      </html>
  );
}
