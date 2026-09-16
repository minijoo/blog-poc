import Head from "next/head";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../components/layout";
import { JordysAPI } from "../lib/jordys-api";
import { Rating } from "../interfaces/jordys-api";

import Image from "next/image";
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
  Photo
} from "react-photo-album";
import "react-photo-album/rows.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FaCircleChevronDown } from "react-icons/fa6";
import { compareEditDate } from "../lib/utils";

const Jordys_API = new JordysAPI(process.env.IP); // we can reference env var here because it will be used only at build time

type Props = {
  ratings: Rating[];
};

const DEFAULT_IMG_URL = '/assets/blog/table-for-two.jpg';
const DEFAULT_IMG_WIDTH = 700;
const DEFAULT_IMG_HEIGHT = 875;


export default function Ratings({ ratings }: Props) {
  function renderNextImage(
    { alt = "", title, sizes }: RenderImageProps,
    { photo, width, height, index }: RenderImageContext,
  ) {
    const [showScreen, setShowScreen] = useState<boolean>(false);
    return (
      <div
        className="border border-black"
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <Image
          fill
          src={photo}
          alt={alt}
          title={title}
          sizes={sizes}
          placeholder={"blurDataURL" in photo ? "blur" : undefined}
        />

        {
          !showScreen
            ?
            <>
              <div
                className="absolute size-full flex flex-col justify-between items-center gap-1 z-5"
                onClick={(evt) => {
                  setShowScreen(true);
                  evt.preventDefault();
                }}
              >
                <div className="w-full px-1 bg-surface/80 shadow-lg shadow-black/5 bg-white/70 font-sans font-bold text-center flex flex-col gap-0">
                  <div>{ratings[index].name}</div>
                  <div>{
                    ratings[index].location
                    &&
                    <span className="text-sm font-normal">
                      📍 {ratings[index].location}
                    </span>
                  }</div>
                </div>
                <div className="w-full px-1 bg-surface/80 shadow-lg shadow-black/5 bg-white/70 font-sans font-bold text-center">
                  {ratings[index].category}
                </div>
              </div>
              <div
                className="absolute -translate-1/2 top-1/2 left-1/2 px-1 rounded-md border border-border bg-surface/80 shadow-lg shadow-black/5 bg-white/70 font-sans font-bold text-2xl z-5"
                onClick={(evt) => {
                  setShowScreen(true);
                  evt.preventDefault();
                }}
              >
                {ratings[index].rating}
              </div>
            </>
            :
            <div
              className="absolute size-full pb-3 flex flex-col justify-between items-center gap-1 backdrop-blur-3xl text-white font-sans"
            >
              <div className="grow w-full text-sm px-2 pt-3 mb-1 overflow-y-scroll bg-black/30"
                onClick={(evt) => {
                  setShowScreen(false);
                  evt.preventDefault();
                }}
              >
                {
                  ratings[index].notes
                    ?
                    <>
                      <p className="underline-offset-3 underline">Notes</p>
                      <p>{ratings[index].notes}</p>
                    </>
                    :
                    <p className="text-center">No notes</p>
                }
              </div>
              <div>
                {
                  ratings[index].link
                    ?
                    <a className="button py-1 px-2 text-center bg-black/40 text-nowrap" href={ratings[index].link}>Read blog</a>
                    :
                    <span>No blog entry</span>
                }
              </div>
            </div>
        }
      </div>
    );
  }

  function TabsClipPath({ defaultTabIndex, onTabChange }: { defaultTabIndex: number, onTabChange: (tab: string) => void }) {
    const [activeTab, setActiveTab] = useState(TABS[defaultTabIndex].name);
    const containerRef = useRef(null);
    const activeTabElementRef = useRef(null);

    useEffect(() => {
      const container = containerRef.current;

      if (activeTab && container) {
        const activeTabElement = activeTabElementRef.current;

        if (activeTabElement) {
          const { offsetLeft, offsetWidth } = activeTabElement;

          const clipLeft = offsetLeft;
          const clipRight = offsetLeft + offsetWidth + 2;
          container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 17px)`;
        }
      }
    }, [activeTab, activeTabElementRef, containerRef]);

    return (
      <div className="relative h-full flex flex-col items-center w-fit mx-0 my-auto text-xs">
        <ul className="relative flex w-full justify-center gap-0 h-full border border-black rounded-full ">
          {TABS.map((tab) => (
            <li key={tab.name}>
              <button
                ref={activeTab === tab.name ? activeTabElementRef : null}
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  onTabChange(tab.name);
                }}
                className="tab-button"
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>

        <div aria-hidden className="tab-clip-path-container" ref={containerRef}>
          <ul className="relative flex w-full justify-center gap-0 bg-gray-800">
            {TABS.map((tab) => (
              <li key={tab.name}>
                <button
                  data-tab={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name);
                  }}
                  className="tab-button-overlay tab-button"
                  tabIndex={-1}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function DropDown() {
    const [open, setOpen] = useState<boolean>(false);
    const listRef = useRef<HTMLDivElement>(null);
    return <div className="relative">
      <div
        className={`h-full w-fit border border-black text-dy-sm rounded-full z-7 hover:cursor-pointer`}
      >
        <div
          className="flex h-full gap-2 px-4 items-center justify-center"
          onClick={() => setOpen(current => !current)}
        >
          <div>Categories</div>
          <div><FaCircleChevronDown /></div>
        </div>
      </div>
      {
        open
        &&
        <div className={`absolute w-50 md:w-70 max-h-80 bg-white top-[97%] z-6 rounded-sm border border-black shadow-[0_5px_20px_#000] flex flex-col gap-2 py-2
                  ${open ? 'rounded-tl-none' : ''}
                  `}>
          <div ref={listRef} className="w-full flex flex-col text-dy-lg py-2 pl-6 pr-3 overflow-y-scroll justify-start">
            {cats.map(cat => (
              <div
                key={cat}
                className="w-full flex gap-4 items-center click-icon"
                onClick={(ev) => {
                  const inputElem = ev.currentTarget.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
                  inputElem[0].checked = !inputElem[0].checked;
                }}
              >
                <div className="h-full">
                  <input
                    name={cat}
                    type="checkbox"
                    className="scale-200"
                    defaultChecked={catsFilter?.has(cat.toLowerCase())}
                    onClick={(ev) => {
                      ev.currentTarget.checked = !ev.currentTarget.checked;
                    }} />
                </div>
                <div className="py-2 text-left">
                  {cat}
                </div>
              </div>
            ))}
          </div>
          <div className="px-2 flex gap-1.5 text-center">
            <div
              className="w-full lg-button"
              onClick={() => {
                const checkboxes = listRef.current?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
                const newCats = Array.from(checkboxes).filter(elem => elem.checked).map(elem => elem.name);
                const searchParams = new URLSearchParams({ c: newCats.join(',').toLowerCase() });
                window.location.href = '/ratings' + (searchParams.size ? '?' + searchParams.toString() : '');
              }}
            >
              Apply
            </div>
            <div
              className="w-full lg-button"
              onClick={() => {
                window.location.href = '/ratings';
              }}
            >
              Clear
            </div>
          </div>
        </div>
      }
    </div>
  }

  const catSet = new Set<string>()
  ratings.forEach(r => catSet.add(r.category))
  const cats = Array.from(catSet);

  const router = useRouter();
  const initParams = router.query as { c: string, s: string };
  const c = initParams.c;
  const s = initParams.s;

  const catsFilter = c ? new Set<string>(c.toLowerCase().split(',')) : null;
  ratings = ratings.filter(r => !catsFilter || catsFilter.has(r.category.toLowerCase()));
  if (s === 'recent') {
    ratings.sort(compareEditDate)
  }

  const photos: Photo[] = ratings.map(r => {
    const imgUrl = r.imgUrl ? r.imgUrl : DEFAULT_IMG_URL;
    const imgW = r.imgWidth ? r.imgWidth : DEFAULT_IMG_WIDTH;
    const imgH = r.imgHeight ? r.imgHeight : DEFAULT_IMG_HEIGHT;
    return {
      src: imgUrl,
      width: imgW,
      height: imgH,
      alt: r.name,
      key: r.name,
      label: r.name,
      title: r.name
    };
  });

  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Head>
            <title>{`All Ratings - Jordy's Site`}</title>
          </Head>
          <section className="relative pb-16">
            <div className="text-2xl font-bold text-center">All Ratings</div>
            <div className="h-12 py-2 flex justify-center gap-2 font-sans">
              <DropDown />
              <TabsClipPath defaultTabIndex={s === 'recent' ? 1 : 0} onTabChange={(tab) => {
                if (tab === 'Recent') {
                  initParams.s = 'recent';
                } else {
                  delete initParams.s;
                }
                const searchParams = new URLSearchParams(initParams);
                window.location.href = '/ratings' + (searchParams.size ? '?' + searchParams.toString() : '');
              }} />
            </div>
            <RowsPhotoAlbum
              targetRowHeight={200}
              photos={photos}
              render={{
                image: renderNextImage,
              }}
              defaultContainerWidth={1200}
              sizes={{
                size: "1168px",
                sizes: [
                  { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
                ],
              }}
            />
          </section>
        </Container>
        <div className="z-50 fixed bottom-0 w-full flex flex-col gap-y-2 justify-items-center place-items-center">
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const apiRatings = await Jordys_API.retrieveRatings();

  if (!apiRatings.length) {
    return { props: { ratings: [] } }
  }

  apiRatings.sort(
    (ratingA, ratingB) => ratingB.rating - ratingA.rating
  );

  return {
    props: { ratings: apiRatings },
  };
}

const TABS = [
  {
    name: "Best",
  },
  {
    name: "Recent",
  },
];;
