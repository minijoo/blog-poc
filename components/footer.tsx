import Container from "./container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-2 md:py-5 flex flex-col items-center md:scale-100 scale-50">
          <Image
            src="/favicon/android-chrome-512x512.png"
            width={160}
            height={160}
            alt="logo"
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
