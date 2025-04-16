import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      fill
      style={{ objectFit: "cover" }}
    />
  );
  return <div className="sm:mx-0 h-full">{image}</div>;
};

export default CoverImage;
