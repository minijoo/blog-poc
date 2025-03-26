import { useLayoutEffect, useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { getMDXComponent } from "mdx-bundler/client";
import GalleryItem from "../interfaces/galleryItem";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import Download from "yet-another-react-lightbox/plugins/download";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { mapGalleryToSlides } from "../lib/utils";
import Moveable from "react-moveable";

type Props = {
  code: string;
  gallery: GalleryItem[];
};

function isElementInMyViewport(el, threshold) {
  const rect = el.getBoundingClientRect();
  console.log(rect.top, rect.left, rect.bottom, rect.right);
  console.log(window.innerHeight, window.innerWidth);
  return (
    rect.top >= threshold &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

function isElementAboveThreshold(el, threshold) {
  const rect = el.getBoundingClientRect();
  return (
    // rect.top >= 0 &&
    rect.bottom <= threshold
  );
}

const PostBody = ({ code, gallery }: Props) => {
  const [slideIndex, setSlideIndex] = useState(null);

  const handler = () => {
    const threshold = Math.floor(
      (window.innerHeight * parseInt(inputRef.current.value)) / 20
    );

    let lowestIndexInViewport = Infinity;
    let highestIndexOutsideThreshold = -1;
    for (const item of document.getElementsByClassName("io")) {
      // item.classList.remove("text-blue-600!");
      // item.classList.add("text-blue-300");

      const index = item["dataset"]["i"];
      // if (isElementInMyViewport(item, threshold)) {
      //   lowestIndexInViewport = Math.min(lowestIndexInViewport, index);
      // }
      // console.log("checking index", index);
      if (isElementAboveThreshold(item, threshold)) {
        // console.log(index, "is above thresh");
        highestIndexOutsideThreshold = Math.max(
          highestIndexOutsideThreshold,
          index
        );
      }
      // console.log(threshold, item.innerHTML, item["dataset"]["i"]);
      moveableRef.current.getControlBoxElement().classList.add("testing");
    }
    // if (lowestIndexInViewport !== Infinity) {
    //   setSlideIndex(lowestIndexInViewport);
    // }
    if (highestIndexOutsideThreshold !== -1) {
      setSlideIndex(highestIndexOutsideThreshold);
      console.log(highestIndexOutsideThreshold);
    }
    // document
    //   .getElementsByClassName("io")
    //   [highestIndexOutsideThreshold]?.classList.add("text-blue-600");
  };

  // for (let i = 0; i < gallery.length; i++) {
  //   gallery[i].off = i < slideIndex;
  // }

  useLayoutEffect(() => {
    addEventListener("DOMContentLoaded", handler, false);
    addEventListener("load", handler, false);
    addEventListener("scroll", handler, false);
    // addEventListener("resize", handler, false); does not work well with fullscreen yarl
    // moveableRef.current.dragStart()
    handler();
  }, []);

  useEffect(() => {});

  const Component = useMemo(() => getMDXComponent(code), [code]);

  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const [draggable, setDraggable] = useState(true);

  const inputRef = useRef(null);
  const [targetLine, setTargetLine] = useState(0);
  return (
    <div className="max-w-2xl mx-auto">
      <Moveable
        className="testing"
        ref={moveableRef}
        target={targetRef}
        draggable={draggable}
        throttleDrag={1}
        // startDragRotate={0}
        // throttleDragRotate={0}
        renderDirections={["nw", "ne", "sw", "se"]}
        resizable={true}
        keepRatio={false}
        throttleResize={1}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
          e.currentTarget.getControlBoxElement().classList.remove("testing");
        }}
        onClick={(e) => {
          console.log("show controls here");
          e.currentTarget.getControlBoxElement().classList.remove("testing");
        }}
        onResize={(e) => {
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = e.drag.transform;
        }}
      />
      <div
        className="fixed bottom-10 left-7/8 w-3/4 md:w-1/4 `max-w-md target"
        ref={targetRef}
        style={{
          maxWidth: "auto",
          maxHeight: "auto",
          minWidth: "auto",
          minHeight: "auto",
        }}
      >
        <Lightbox
          inline={{
            style: {
              width: "100%",
              maxWidth: "900px",
              minHeight: "200px",
              height: "100%",
            },
          }}
          slides={gallery.map(mapGalleryToSlides)}
          // open={slideIndex >= 0}
          index={slideIndex}
          // close={() => setIndex(-1)}
          carousel={{
            finite: true,
            padding: 0,
          }}
          animation={{
            fade: 80,
            swipe: 80,
            zoom: 100,
          }}
          // controller={{
          //   closeOnPullDown: true,
          // }}
          zoom={{
            maxZoomPixelRatio: 4,
            doubleClickMaxStops: 1,
          }}
          on={{
            view: ({ index }) => {
              // console.log(index);
              for (const item of document.getElementsByClassName("io")) {
                const it_index = parseInt(item["dataset"]["i"]);
                item.classList.remove("text-blue-600!");
                if (it_index === index) {
                  item.classList.add("text-blue-600!");
                }
              }
              setSlideIndex(index);
            },
            enterFullscreen: () => {
              setDraggable(false);
            },
            exitFullscreen() {
              setDraggable(true);
            },
          }}
          plugins={[Inline, Video, Download, Fullscreen]}
        />
        {/* {gallery.map(({ name, url, off }) => (
          <img
            className={`h-20 w-20 duration-500 ${
              off ? "opacity-0" : "opacity-100"
            }`}
            src={url}
            alt={name}
            key={name}
          />
        ))} */}
      </div>
      <div
        id="bar"
        style={{
          top: targetLine,
          transition: "top .5s ease, opacity 1s ease",
        }}
        className="text-center text-red-500 fixed left-0 w-full opacity-0 -translate-y-2"
      >
        <div className="w-full border-t-3 border-red-500 border-dotted"></div>
        <div className="w-full text-center text-red-500">
          <span className="bg-white duration-1000">
            Trigger line for blue words
          </span>
        </div>
      </div>
      <div className="fixed top-[40vh] right-0 h-48 flex flex-row justify-end duration-500 translate-x-10">
        <div
          onClick={(e) => {
            const el = e.currentTarget.parentElement;
            if (el.classList.contains("translate-x-10")) {
              el.classList.remove("translate-x-10");
            } else {
              el.classList.add("translate-x-10");
            }
          }}
        >
          ⬅️
        </div>
        <div className="flex flex-col">
          <div className="w-10 flex flex-col place-items-center items-center">
            <div
              className="text-xl text-center border-1 rounded-full h-8 w-8 active:border-3"
              onClick={() => {
                setTargetLine(
                  Math.floor(
                    (window.innerHeight * parseInt(inputRef.current.value)) / 20
                  )
                );
                if (
                  document
                    .getElementById("bar")
                    .classList.contains("opacity-100")
                ) {
                  document
                    .getElementById("bar")
                    .classList.remove("opacity-100");
                  document.getElementById("bar").classList.add("opacity-0");
                } else {
                  document.getElementById("bar").classList.add("opacity-100");
                  document.getElementById("bar").classList.remove("opacity-0");
                }
              }}
            >
              🧐
            </div>
          </div>
          <div className="flex-grow flex flex-cols place-content-center items-center">
            <input
              className=""
              style={{
                // @ts-ignore
                "writing-mode": "vertical-lr",
                // "margin-block-end": "20px",
              }}
              ref={inputRef}
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="20"
              defaultValue={10}
              onChange={(e) => {
                const val = e.currentTarget.value;
                const newLine = Math.floor(
                  (window.innerHeight * parseInt(val)) / 20
                );
                document.getElementById("bar").classList.add("opacity-100");
                document.getElementById("bar").classList.remove("opacity-0");
                document
                  .getElementById("bar")
                  .getElementsByTagName("span")[0]
                  .classList.add("opacity-100");
                document
                  .getElementById("bar")
                  .getElementsByTagName("span")[0]
                  .classList.remove("opacity-0");

                setTargetLine(newLine);
                setTimeout(() => {
                  document.getElementById("bar").classList.add("opacity-0");
                  document
                    .getElementById("bar")
                    .classList.remove("opacity-100");
                  document
                    .getElementById("bar")
                    .getElementsByTagName("span")[0]
                    .classList.add("opacity-0");
                  document
                    .getElementById("bar")
                    .getElementsByTagName("span")[0]
                    .classList.remove("opacity-100");
                }, 3000);
              }}
            />
          </div>
        </div>
      </div>
      <div className="prose prose-lg md:prose-2xl leading-normal md:leading-normal tracking-tighter">
        <Component />
      </div>
    </div>
  );
};

export default PostBody;
