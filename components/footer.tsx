import Container from "./container";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [expand, setExpand] = useState(false);
  return (
    <footer
      className={cn(
        "relative bg-neutral-50 border-t border-neutral-200 w-full duration-700",
        {
          "h-48": expand,
          "h-10": !expand,
        }
      )}
    >
      <Container>
        <div className="flex flex-row mt-2">
          <div className="grow flex flex-col text-xl gap-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="m480-300 160-160H320l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm560-520v-120H200v120h560Zm-560 80v360h560v-360H200Zm0-80v-120 120Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M320-500h320L480-660 320-500ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-200v120h560v-120H200Zm0-80h560v-360H200v360Zm0 80v120-120Z" />
                </svg>
              )}
            </div>
            <div>
              <Link href="/">Home</Link>
            </div>
            <div>
              <Link href="/posts">All Posts</Link>
            </div>
            <div>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="text-md">
            © <span className="text-sm">2024</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
