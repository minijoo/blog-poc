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
    <section className="flex-col flex items-center pt-8 pb-4 relative z-50 bg-white -translate-y-1">
      <div className="flex-grow flex w-full place-content-center -translate-x-3">
        <div className="text-shadow my-0 block w-20 `h-full relative text-right md:mx-3">
          <Image
            src="/favicon/safari-pinned-tab.svg"
            alt="logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="">
          <Link href="/" className="hover:underline active:underline">
            <h1 className="text-5xl md:text-7xl text-center tracking-tighter leading-tight">
              Jordy's.Site
            </h1>
          </Link>
        </div>
      </div>
      <h4 className="text-md md:text-xl text-center">
        A place for my photos, videos and thoughts.
      </h4>
      {/* <div className="text-shadow my-0 block md:inline-block md:w-32 md:h-32 w-20 relative hidden">
        <Image src="/favicon/safari-pinned-tab.svg" alt="logo" fill />
      </div>{" "} */}
    </section>
  );
};

export default Header;
