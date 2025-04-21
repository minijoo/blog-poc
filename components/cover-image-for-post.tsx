import { useEffect } from "react";
import { createHyphenator, justifyContent } from "tex-linebreak";
import enUsPatterns from "hyphenation.en-us";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  useEffect(() => {
    //   document.getElementsByTagName("html")[0].classList.remove("no-scrollbar");
    //   // this adds scrollbar to the page
    const title = document.getElementById("post-title");
    const titleWords = title.innerHTML.split(/\s+/g);
    const widths = titleWords.map((word) => {
      return word.length;
    });
    const total = widths.reduce((n, a) => n + a, 0);
    let leftHand = 0,
      rightHand = total,
      minDiff = total,
      midIdx = 0;
    widths.forEach((a, i) => {
      leftHand += a;
      rightHand -= a;
      const currDiff = Math.abs(rightHand - leftHand);
      if (currDiff < minDiff) {
        midIdx = i;
        minDiff = currDiff;
      } else {
        return;
      }
    });

    const newTitle =
      titleWords.splice(0, midIdx + 1).join(" ") +
      "<br />" +
      titleWords.join(" ");
    console.log(newTitle);

    title.innerHTML = newTitle;
  }, []);

  const image = (
    <div>
      <div
        className="w-full `h-42 bg-cover bg-center"
        style={{
          backgroundImage: `url(${encodeURI(src)})`,
        }}
      >
        <div className="`h-full w-full backdrop-blur-sm bg-white/50 text-black font-semibold active:text-transparent hover:text-transparent active:bg-transparent hover:backdrop-blur-none active:backdrop-blur-none hover:bg-transparent px-5 md:px-10">
          <div
            id="post-title"
            className="min-h-32 select-none tracking-normal grid leading-tight items-center text-6xl text-center"
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
