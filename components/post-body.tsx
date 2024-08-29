import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";

type Props = {
  // content: string;
  code: string;
  // children: React.ReactNode;
};

const components = {};

const PostBody = ({ code }: Props) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="max-w-2xl mx-auto">
      {/* <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <div className="prose prose-lg md:prose-2xl leading-normal md:leading-normal tracking-tighter">
        <Component />
      </div>
    </div>
  );
};

export default PostBody;
