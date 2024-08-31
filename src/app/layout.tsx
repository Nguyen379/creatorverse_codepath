import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creatorse Codepath",
  description: "NextJs app built by Nguyen379",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-navy-900 text-white min-h-screen`}
      >
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-blue-500 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <Link
                href="/"
                className="text-gray-100 hover:text-white font-bold"
              >
                Creatorverse
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-100 hover:text-white font-bold"
              >
                Home Page
              </Link>
              <span className="text-white">|</span>

              <Link
                href="/ShowCreators"
                className="text-gray-100 hover:text-white font-bold"
              >
                View All Creators
              </Link>

              <span className="text-white">|</span>

              <Link
                href="/AddCreator"
                className="text-gray-100 hover:text-white font-bold"
              >
                Add New Creator
              </Link>

              {/* <span className="text-white">|</span>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white">
                  Pages ▼
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      href="/page1"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Page 1
                    </Link>
                    <Link
                      href="/page2"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Page 2
                    </Link>
                  </div>
                </div> */}
              {/* </div> */}
            </nav>
            <div className="flex items-center space-x-4">
              {/* <button className="text-white hover:text-gray-200">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </button> */}
              <button className="text-white hover:text-gray-200">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>
            </div>
          </header>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
