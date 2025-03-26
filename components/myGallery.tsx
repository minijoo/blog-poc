import Image from "next/image";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
// import "react-image-lightbox/style.css";

type Props = {
  title: string;
  images: any[];
};

export default function MyGallery({ title, images }: Props) {
  try {
    const [index, setIndex] = useState(-1);

    const currentImage = images[index];
    const nextIndex = (index + 1) % images.length;
    const nextImage = images[nextIndex] || currentImage;
    const prevIndex = (index + images.length - 1) % images.length;
    const prevImage = images[prevIndex] || currentImage;

    const handleClick = (index: number, item: any) => setIndex(index);
    const handleClose = () => setIndex(-1);
    const handleMovePrev = () => setIndex(prevIndex);
    const handleMoveNext = () => setIndex(nextIndex);

    return (
      <div>
        <Gallery
          images={images}
          onClick={handleClick}
          enableImageSelection={false}
        />
        {!!currentImage && (
          /* @ts-ignore */
          <div>
            <center>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMovePrev}
              >
                &lt;
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
                onClick={handleClose}
              >
                X
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMoveNext}
              >
                &gt;
              </button>
            </center>
            <img src={images[index].src} alt={images[index].caption} />
          </div>
        )}
      </div>
    );
  } catch (e) {
    return (
      <div>
        No images were retrieved<p>{e.toString()}</p>
      </div>
    );
  }
}
