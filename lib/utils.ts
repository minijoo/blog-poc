import { Slide, SlideImage, SlideVideo } from "yet-another-react-lightbox";
import GalleryItem from "../interfaces/galleryItem";
import { ApiGalleryItem } from "../interfaces/jordys-api";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const injectGalleryMdx = (
  postBody: string,
  galleryByName: Map<string, ApiGalleryItem>
) => {
  let newBody = postBody;

  const linkRegex = /\$\[(.+)\]\(([\w\s\.,]+)\)/g;

  let resultArr: RegExpExecArray;
  while ((resultArr = linkRegex.exec(postBody)) !== null) {
    const matchString = resultArr[0]; // entire string
    const text_string = resultArr[1] as string;
    const item___name = resultArr[2] as string;

    const galleryItem = galleryByName.get(item___name.toLowerCase());
    if (!galleryItem) continue;
    const mdxGalleryItem: GalleryItem = {
      path: galleryItem.url,
      type: galleryItem.type,
      width: galleryItem.width,
      height: galleryItem.height,
    };
    if (galleryItem.type === "video") {
      mdxGalleryItem.path = galleryItem.video_thumb_url;
      mdxGalleryItem.video = {
        path: galleryItem.url,
        type: "video/mp4",
      };
    }

    newBody = newBody.replace(
      matchString,
      `<LightboxLink2 slide={${JSON.stringify(
        mapGalleryToSlides(mdxGalleryItem)
      )}}>${text_string}</LightboxLink2>`
    );
  }

  const regex = /\$\((.+)\)/g;

  while ((resultArr = regex.exec(postBody)) !== null) {
    const matchString = resultArr[0]; // "$(name1[caption], name2)"
    const item__names = (resultArr[1] as string).split(/\s*,\s*/);

    const galleryMdx = item__names
      .filter((el) => el.length)
      .reduce((arr, item) => {
        const captionResult = /\[(.+)\]/g.exec(item);
        if (captionResult !== null) {
          item = item.replace(captionResult[0], "");
        }
        const galleryItem = galleryByName.get(item.toLowerCase());
        if (!galleryItem) return arr;
        const mdxGalleryItem: GalleryItem = {
          path: galleryItem.url,
          type: galleryItem.type,
          width: galleryItem.width,
          height: galleryItem.height,
          caption: captionResult !== null ? captionResult[1] : undefined,
        };
        if (galleryItem.type === "video") {
          mdxGalleryItem.path = galleryItem.video_thumb_url;
          mdxGalleryItem.video = {
            path: galleryItem.url,
            type: "video/mp4",
          };
        }
        arr.push(mdxGalleryItem);
        return arr;
      }, []);

    newBody = newBody.replace(
      matchString,
      "<div className='not-prose'><PhotoGallery slides={" +
        JSON.stringify(galleryMdx) +
        ".map(mapGalleryToSlides)} /></div>"
    );
  }

  return `import PhotoGallery from "../components/photo-gallery";
import { mapGalleryToSlides } from "../lib/utils";
import LightboxLink2 from "../components/lightbox-link-2";

${newBody}`;
};

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
      description: galleryItem.caption,
    };
    return slide;
  } else {
    const slide: SlideImage = {
      src: galleryItem.path,
      width: galleryItem.width,
      height: galleryItem.height,
      description: galleryItem.caption,
    };
    return slide;
  }
};

export { mapGalleryToSlides, dbPostToStaticPostContent, injectGalleryMdx };
