import Container from "./container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-2 md:py-5 flex flex-col items-center md:scale-100 ">
          <Image
            src="/favicon/android-chrome-512x512.png"
            width={120}
            height={120}
            alt="logo"
          />
        </div>
        <div className="absolute z-50 bottom-2 right-2 text-sm">
          © <span className="text-xs">2024</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
