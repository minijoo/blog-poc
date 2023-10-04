// mdxprovider doesn't work. this file cannot be used anywhere until mdxprovider is fixed.

import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function Link({ children }: Props) {
  return (
    <>
      <a className="hover:underline">{children}</a>
    </>
  );
}
