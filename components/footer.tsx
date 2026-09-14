import Container from "./container";
import cn from "classnames";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";

const Screen = ({ open, onScreenClick }: { open: boolean, onScreenClick: MouseEventHandler<HTMLDivElement> }) => {
  const [doRender, setRender] = useState<boolean>(false);
  useEffect(() => {
    if (open) {
      setRender(true);
    }
  }, [open]);

  if (!doRender) {
    return <></>;
  }
  return <div
    className="drawer fixed top-0 w-full h-dvh backdrop-blur-lg"
    onTransitionEnd={() => !open && setRender(false)}
    style={{ "--open": open ? 1 : 0 } as React.CSSProperties}
    onClick={onScreenClick}

  />
}

const Footer = () => {
  const [expand, setExpand] = useState(false);
  return (<>
    <Screen
      open={expand}
      onScreenClick={() => setExpand(false)}
    />
    <footer
      className={cn(
        "z-5 relative bg-neutral-50 border-t border-neutral-200 w-full duration-200 overflow-hidden flex justify-center ease-out",
        {
          "h-78": expand,
          "h-10": !expand,
        }
      )}
    >
      <div className="w-full max-w-3xl flex flex-row mt-2 px-5">
        <div className="grow flex flex-col text-xl gap-2">
          <div
            className="flex flex-col gap-1 w-16 cursor-pointer duration-200 active:scale-120 hover:scale-120"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <div className="h-[1px] border border-gray-900 w-full" />
            <div className="h-[1px] border border-gray-700 w-full" />
            <div className="h-[1px] border border-gray-500 w-full" />
            <div className="h-[1px] border border-gray-400 w-full" />
          </div>
          <div className="flex">
            <div className="active:scale-80 hover:scale-120 duration-200">
              <Link href="/">Home</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-80 hover:scale-120 duration-200">
              <Link href="/ratings">Jordy's Ratings</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-80 hover:scale-120 duration-200">
              <Link href="/tech_posts">SE Posts</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-80 hover:scale-120 duration-200">
              <Link href="/posts">All Posts</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-80 hover:scale-120 duration-200">
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-80 hover:scale-120 duration-200">
              <Link href="/admin">Admin</Link>
            </div>
          </div>
        </div>
        <div className="text-md">
          <span className="text-sm">2026</span>
        </div>
      </div>
    </footer>
  </>);
};

export default Footer;
