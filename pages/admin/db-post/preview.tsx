// import { bundleMDX } from "mdx-bundler";
import PostBody from "../../../components/post-body-2";
import { evaluate } from "@mdx-js/mdx";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { JSX, useEffect, useState } from "react";
import type { MDXProps } from "mdx/types";
import type { EvaluateOptions } from "@mdx-js/mdx";

type ReactMDXContent = (props: MDXProps) => JSX.Element;
type Runtime = Pick<EvaluateOptions, "jsx" | "jsxs" | "Fragment">;

const runtime = { jsx, jsxs, Fragment } as Runtime;

export default function PreviewPage({}) {
  const [MdxContent, setMdx] = useState<ReactMDXContent>(() => () => null);
  useEffect(() => {
    const body = localStorage.getItem("cat");
    // trick to unescape html
    // var txt = document.createElement("textarea");
    // txt.innerHTML = body;
    const body2 = `export const a = 1;
`;
    evaluate(body, runtime).then((r) => setMdx(() => r.default));
  }, []);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg md:prose-2xl leading-normal md:leading-normal tracking-tighter">
        <MdxContent />
      </div>
    </div>
  );
}
