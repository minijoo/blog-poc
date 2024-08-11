import Container from "./container";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-neutral-50 border-t border-neutral-200 h-10 w-full">
      <Container>
        <div className="absolute z-50 bottom-2 right-2 text-sm">
          © <span className="text-xs">2024</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
