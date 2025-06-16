import { getMDXComponent } from "mdx-bundler/client";
import fs from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";
import { bundleMDX } from "mdx-bundler";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import React, { useLayoutEffect } from "react";
import { createHyphenator, justifyContent } from "tex-linebreak";
import enUsPatterns from "hyphenation.en-us";

type Props = {
  code: string;
};

export default function Contact({ code }) {
  useLayoutEffect(() => {
    const hyphenate = createHyphenator(enUsPatterns);
    const paragraphs = Array.from(document.querySelectorAll("p")).filter(
      (p) =>
        !p.id && // no elements in prose should have ids
        (!p.firstElementChild || // skip katex texts
          !p.firstElementChild.classList.contains("katex"))
    );
    paragraphs.length && justifyContent(paragraphs, hyphenate);
  }, []);

  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <Head>
        <title>{`Contact - Jordy's Site`}</title>
      </Head>
      <Container>
        <Header />
        <section className="pb-12">
          <div className="max-w-2xl mx-auto mb-4">
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
              integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
              crossOrigin="anonymous"
            />
            <div className="prose prose-lg md:prose-2xl">
              <Component />
            </div>
          </div>
        </section>
      </Container>
      <div className="fixed bottom-0 w-screen flex flex-col gap-y-2 justify-items-center place-items-center">
        <Footer />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const fullPath = join(process.cwd(), "pages", "contact.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const result = await bundleMDX({
    source: fileContents,
    mdxOptions(options: Record<string, any>) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMath];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex];
      return {
        ...options,
        providerImportSource: "@mdx-js/react",
      };
    },
  });

  return {
    props: { code: result.code },
  };
}
