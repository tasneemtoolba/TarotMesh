import type { Metadata } from "next";
import "./globals.css";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "Mystical Tarot Reader - AI-Powered Divination",
  description: "Experience mystical tarot readings powered by AI and blockchain randomness. Ask your questions and receive guidance from the cards.",
};

/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black dark flex flex-col min-h-screen">
        {/* Header (Fixed Height) */}
        <header className="py-6 flex items-center justify-between relative">
          <div className="ml-4 text-theme-primary text-lg font-semibold">
            🔮 Mystical Tarot
          </div>

          <div className="mr-4 text-theme-primary text-sm">
            Powered by Flow
          </div>
        </header>

        {/* Main Content (Dynamic, Grows but Doesn't Force Scroll) */}
        <main className="flex-grow flex items-center justify-center px-4">{children}</main>

        {/* Footer (Fixed Height) */}
        <footer className="py-4 text-center text-theme-primary/70 dark:text-theme-primary/70 flex-none">
          <div className="mt-2">
            <a
              href="https://github.com/coinbase/agentkit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-theme-primary dark:text-theme-primary"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-theme-primary dark:text-theme-primary"
            >
              Documentation
            </a>{" "}
            |{" "}
            <a
              href="https://discord.gg/CDP"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-theme-primary dark:text-theme-primary"
            >
              Discord
            </a>
          </div>
          <p className="text-xs text-theme-primary/50 mt-1">
            Powered by{" "}
            <a
              href="https://docs.cdp.coinbase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-primary dark:text-theme-primary hover:underline"
            >
              CDP
            </a>{" "}
            & Flow Blockchain
          </p>
          <p className="text-xs text-theme-primary/50 mt-2">✨ Mystical readings with verifiable randomness ✨</p>
        </footer>
      </body>
    </html>
  );
}
