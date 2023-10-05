import Container from "./container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col items-center">
          <Image
            src="/favicon/android-chrome-512x512.png"
            width={190}
            height={190}
            alt="logo"
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
