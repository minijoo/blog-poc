import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

type Props = {
  code: string;
};

const PostBody = ({ code }: Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="prose prose-lg md:prose-2xl leading-normal md:leading-normal tracking-tighter">
        <Component />
      </div>
    </div>
  );
};

export default PostBody;
