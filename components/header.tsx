import Link from "next/link";
import Image from "next/image";

function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const Header = () => {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Jordy's{" "}
          <div className="inline-block md:w-16 md:h-16 w-8 h-8 relative">
            <Image src="/favicon/safari-pinned-tab.svg" alt="logo" fill />
          </div>{" "}
          Blog
        </Link>
        .
      </h2>
    </>
  );
};

export default Header;
