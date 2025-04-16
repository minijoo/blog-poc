import Container from "./container";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [expand, setExpand] = useState(false);
  return (
    <footer
      className={cn(
        "relative bg-neutral-50 border-t border-neutral-200 w-full duration-400 overflow-hidden",
        {
          "h-48": expand,
          "h-10": !expand,
        }
      )}
    >
      <div className="max-w-3xl flex flex-row mt-2 mx-auto px-5">
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
            <div className="active:scale-120 hover:scale-120 duration-200">
              <Link href="/">Home</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-120 hover:scale-120 duration-200">
              <Link href="/posts">All Posts</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-120 hover:scale-120 duration-200">
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="flex">
            <div className="active:scale-120 hover:scale-120 duration-200">
              <Link href="/admin">Admin</Link>
            </div>
          </div>
        </div>
        <div className="text-md">
          © <span className="text-sm">2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
