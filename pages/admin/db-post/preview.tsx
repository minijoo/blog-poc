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
    let body2 = body;

    const regex = /\$\(([\w\s,]+)\)/g;

    let resultArr: RegExpExecArray;
    while ((resultArr = regex.exec(body)) !== null) {
      const matchString = resultArr[0]; // "$(name1, name2)"
      body2 = body2.replace(
        matchString,
        `<p className="text-center">${matchString}</p>`
      );
    }

    const regex2 = /import.+\;/g;
    while ((resultArr = regex2.exec(body)) !== null) {
      const matchString = resultArr[0];
      body2 = body2.replace(matchString, "");
    }

    const regex3 = /@preview-escape\n(.+)/g;
    while ((resultArr = regex3.exec(body)) !== null) {
      const matchString = resultArr[0];
      const escaped = resultArr[1] as string;
      body2 = body2.replace(matchString, "`" + escaped + "`");
    }

    evaluate(body2.trimStart(), runtime).then((r) => setMdx(() => r.default));
  }, []);
  return (
    <div className="max-w-3xl mx-auto">
      <div className="prose prose-lg md:prose-2xl leading-normal md:leading-normal tracking-tighter">
        <MdxContent />
      </div>
    </div>
  );
}
