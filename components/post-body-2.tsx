import { useEffect, useMemo, useState } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import PostMdx from "./post-mdx";

type Props = {
  code: string;
  isEncrypted: boolean;
};

const PostBody = ({ code, isEncrypted }: Props) => {
  const [decrypted, setDecrypted] = useState(null);

  useEffect(() => {
    if (!isEncrypted) return;

    const INPUT_KEY = parseInt(prompt("Key?"));
    let decryptedCode = "";
    for (let i = 0; i < code.length; i++) {
      const ch = code.charCodeAt(i);
      decryptedCode += String.fromCharCode(ch ^ INPUT_KEY);
    }
    setDecrypted(decryptedCode);
  }, [code]);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      {!isEncrypted ? (
        <PostMdx code={code} />
      ) : decrypted ? (
        <PostMdx code={decrypted} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PostBody;
