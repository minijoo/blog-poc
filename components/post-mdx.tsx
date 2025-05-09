import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { createHyphenator, justifyContent } from "tex-linebreak";
import enUsPatterns from "hyphenation.en-us";

type Props = {
  code: string;
};

export default function PostMdx({ code }: Props) {
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

  try {
    const Component = useMemo(() => getMDXComponent(code), [code]);

    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
          integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
          crossOrigin="anonymous"
        />
        <div className="prose prose-lg md:prose-xl `leading-normal `md:leading-normal `tracking-tight">
          <Component />
        </div>
      </>
    );
  } catch (err) {
    return <>Nothing to see here...</>;
  }
}
