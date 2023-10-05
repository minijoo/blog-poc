import Image from "next/image";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <div className="text-shadow my-0 mx-auto block md:inline-block md:w-32 md:h-32 w-20 h-20 relative">
          <Image src="/favicon/safari-pinned-tab.svg" alt="logo" fill />
        </div>{" "}
        Jordy's Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A place for my photos, videos and thoughts.
      </h4>
    </section>
  );
};

export default Intro;
