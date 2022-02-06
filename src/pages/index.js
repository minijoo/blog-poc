import tinytime from 'tinytime'
import Link from 'next/link'
import Head from 'next/head'
import getAllPostPreviews from '@/getAllPostPreviews'
import twitterCard from '@/img/twitter-card.jpg'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Script from 'next/script'

const posts = getAllPostPreviews()

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export default function Home() {
  return (
    <>
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <main>
          <div className="divide-y divide-gray-200 dark:divide-gray-500">
            <Head>
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@tailwindcss" />
              <meta name="twitter:creator" content="@tailwindcss" />
              <meta name="twitter:title" content="Blog – Tailwind CSS" />
              <meta name="twitter:description" content="News content from the Tailwind CSS team." />
              <meta name="twitter:image" content={`https://blog.tailwindcss.com${twitterCard}`} />
              <meta property="og:url" content="https://blog.tailwindcss.com" />
              <meta property="og:type" content="article" />
              <meta property="og:title" content="Blog – Tailwind CSS" />
              <meta property="og:description" content="News content from the Tailwind CSS team." />
              <meta property="og:image" content={`https://blog.tailwindcss.com${twitterCard}`} />
              <title>Blog – Starship Sports</title>
              <meta name="description" content="News content from the Tailwind CSS team." />
            </Head>
            <div className="pt-6 pb-8 space-y-2 md:space-y-5">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">
                Latest
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-300">Blog by us for us.</p>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-500">
              {posts.map(({ link, module: { default: Component, meta } }) => {
                return (
                  <li key={link} className="py-12">
                    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium text-gray-500 dark:text-gray-300">
                          <time dateTime={meta.date}>
                            {postDateTemplate.render(new Date(meta.date))}
                          </time>
                        </dd>
                        <dt className="sr-only">Published by</dt>
                        <dd className="text-base font-medium text-gray-500 dark:text-gray-300">
                          {meta.authors.map((author) => (
                            <li key={author.twitter} className="flex items-center space-x-2">
                              <dl className="text-sm font-medium whitespace-no-wrap">
                                <dt className="sr-only">Name</dt>
                                <dd className="text-gray-900 dark:text-gray-300">{author.name}</dd>
                              </dl>
                            </li>
                          ))}
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <h2 className="text-2xl font-bold tracking-tight">
                            <Link href={link}>
                              <a className="text-gray-900 dark:text-white">{meta.title}</a>
                            </Link>
                          </h2>
                          <div className="prose dark:prose-invert max-w-none text-gray-500 dark:text-gray-300">
                            <Component />
                          </div>
                        </div>
                        <div className="text-base font-medium">
                          <Link href={link}>
                            <a
                              className="text-emerald-600 hover:text-emerald-700"
                              aria-label={`Read "${meta.title}"`}
                            >
                              Read more &rarr;
                            </a>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </main>
      </SectionContainer>
    </>
  )
}
