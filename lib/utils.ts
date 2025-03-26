import { Slide, SlideImage, SlideVideo } from "yet-another-react-lightbox";
import GalleryItem from "../interfaces/galleryItem";
import { Photo } from "react-photo-album";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const dbPostToStaticPostContent = (content: string): [string, string[]] => {
  const inputStr = content;
  let newStr = "";
  let copyFromIndex = 0;
  const reg = /\|~[^~|\n]+~\|/g;
  let resultArray;
  let i = 0;
  const imgOrder = [];
  while ((resultArray = reg.exec(inputStr)) !== null) {
    const matchIndex = resultArray["index"];
    const matchString = resultArray[0];
    const imgName = matchString.substring(2, matchString.length - 2);
    imgOrder.push(imgName);
    let charWasSeen = false;
    let beginningOfLastWordIndex = matchIndex;
    let lastWord = "";
    while (
      !charWasSeen ||
      inputStr[beginningOfLastWordIndex - 1].trim().length === 1
    ) {
      beginningOfLastWordIndex--;
      if (inputStr[beginningOfLastWordIndex].trim().length === 1) {
        charWasSeen = true;
        lastWord = inputStr[beginningOfLastWordIndex] + lastWord;
      }
    }

    newStr += inputStr.substring(copyFromIndex, beginningOfLastWordIndex);
    newStr += `<span className="io text-blue-300" data-i="${i++}">`;
    newStr += lastWord;
    newStr += `</span>`;

    copyFromIndex = matchIndex + matchString.length;
  }
  return [newStr + inputStr.substring(copyFromIndex), imgOrder];
};

const mapGalleryToSlides = (galleryItem: GalleryItem): Slide => {
  if (galleryItem.type === "video") {
    console.log(galleryItem.name, "is a video");
    const slide: SlideVideo = {
      type: "video",
      sources: [
        {
          src: galleryItem.video.path,
          type: galleryItem.video.type,
        },
      ],
      poster: galleryItem.path,
      width: galleryItem.width,
      height: galleryItem.height,
      autoPlay: true,
    };
    return slide;
  } else {
    const slide: SlideImage = {
      src: galleryItem.path,
      width: galleryItem.width,
      height: galleryItem.height,
      srcSet: breakpoints.map((breakpoint) => {
        const height = Math.round(
          (galleryItem.height / galleryItem.width) * breakpoint
        );
        return {
          src: galleryItem.path,
          width: breakpoint,
          height,
        };
      }),
    };
    return slide;
  }
};

export { mapGalleryToSlides, dbPostToStaticPostContent };
