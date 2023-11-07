import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"

export function Layout({ children }) {
  return (
    <body className="bg-slate-900 text-gray-100">
      <PreviewAlert />
      
      <header>
        <div className="container flex items-center justify-between py-6 mx-auto">
          <Link href="/" className="text-2xl font-semibold no-underline">
            Tyler's Blog
          </Link>
          <nav>
            <ul className="flex gap-x-3">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-blue-600"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="hover:text-blue-600"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>
      
    </body>
  )
}
