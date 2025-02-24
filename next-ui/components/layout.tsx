import Script from "next/script"

import { PreviewAlert } from "components/preview-alert"
import { Section } from "./section"
import ContactForm from "./contact-form"
import HomepageHero from "./homepage-hero"
import Link from "next/link"
import GradientText from "./gradient-text"

export function Layout({ children }) {
  return (
    <body className="bg-zinc-900 text-gray-100">
      <PreviewAlert />
      
      <Section>
        <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl no-underline font-serif">
            <GradientText>a furtive space</GradientText>
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

      <Section>
        <HomepageHero />
      </Section>

      <main>{children}</main>

      <Section>
        <ContactForm />
      </Section>

      <Section>
        <div className="border-t border-gray-600 pt-6">
          <div className="text-sm text-gray-200">&copy; {(new Date()).getFullYear()} Tyler Funk.</div>
        </div>
      </Section>
      
      <Script
        data-goatcounter="https://tcfunk.goatcounter.com/count"
        src="//gc.zgo.at/count.js"
        strategy="lazyOnload"
        onLoad={() => console.log(`script loaded`)}
      />
    </body>
  )
}
