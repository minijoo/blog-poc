import Image from "next/image";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-8 md:mb-12">
      <div className="text-shadow my-0 block md:inline-block md:w-32 md:h-32 w-20 h-20 relative md:hidden">
        <Image src="/favicon/safari-pinned-tab.svg" alt="logo" fill />
      </div>
      <div>
        <h1 className="text-5xl md:text-7xl text-center font-bold tracking-tighter leading-tight md:pr-8">
          Jordy's.Site
        </h1>
        <h4 className="md:text-left text-md md:pl-8 text-center">
          A place for my photos, videos and thoughts.
        </h4>
      </div>
      <div className="text-shadow my-0 block md:inline-block md:w-32 md:h-32 w-20 h-20 relative hidden">
        <Image src="/favicon/safari-pinned-tab.svg" alt="logo" fill />
      </div>{" "}
    </section>
  );
};

export default Intro;
