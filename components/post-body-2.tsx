import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

type Props = {
  code: string;
};

const PostBody = ({ code }: Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
        integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
        crossOrigin="anonymous"
      />
      <div className="prose prose-xl md:prose-2xl `leading-normal `md:leading-normal `tracking-tight">
        <Component />
      </div>
    </div>
  );
};

export default PostBody;
