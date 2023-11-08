import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import { Section } from "./section"
import GradientText from "./gradient-text"

export function Layout({ children }) {
  return (
    <body className="bg-zinc-900 text-gray-100">
      <PreviewAlert />
      
      <Section>
        <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl no-underline font-serif">
            <GradientText>Tyler's Blog</GradientText>
          </Link>

          <nav>
            <ul className="flex gap-x-3 text-lg text-gray-200">
              <li>
                <Link href="/blog" className="hover:text-white hover:underline underline-offset-8">
                  Blog</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white hover:underline underline-offset-8">
                  Projects</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline underline-offset-8">
                  Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Section>

      <main>{children}</main>
      
    </body>
  )
}
