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
import { FaArrowLeft, FaArrowRight, FaCircleChevronDown, FaHandPointRight, FaMountainCity, FaRepeat, FaStar } from "react-icons/fa6";
import { MdCloseFullscreen, MdOutlineDashboardCustomize } from "react-icons/md";
import { compareEditDate } from "../lib/utils";
import { Kaisei_Opti } from "next/font/google";
import { GiShrug } from "react-icons/gi";

const kaisei = Kaisei_Opti({
  weight: "400",
  subsets: ["cyrillic"],
  variable: "--font-kaisei",
});

const Jordys_API = new JordysAPI(process.env.IP); // we can reference env var here because it will be used only at build time

type Props = {
  ratings: Rating[];
};

const DEFAULT_IMG_URL = '/assets/blog/table-for-two.jpg';
const DEFAULT_IMG_WIDTH = 700;
const DEFAULT_IMG_HEIGHT = 875;

function RatingPills({ rating }: { rating: Rating }) {
  return <>
    {rating.rating &&
      <>
        {
          rating.rating >= 80
            ? <>
              {
                rating.rating >= 90
                &&
                <div className="px-1 text-zinc-700 border border-zinc-600 rounded-md text-sm flex gap-0.5 items-center">
                  <FaRepeat /> Go-again
                </div>
              }
              {
                rating.rating >= 80
                &&
                <div className="px-1 text-zinc-700 border border-zinc-600 rounded-md text-sm flex gap-0.5 items-center">
                  <FaHandPointRight /> Telling Friends
                </div>
              }
            </>
            :
            rating.rating >= 70
            &&
            <div className="px-1 text-zinc-700 border border-zinc-600 rounded-md text-sm flex gap-0.5 items-center">
              <GiShrug /> Could be good
            </div>
        }
        <div className="px-1 text-zinc-700 border border-zinc-600 rounded-md text-sm flex gap-0.5 items-center">{rating.rating} / 100</div>
      </>
    }
  </>
}

function Modal({
  rating,
  onClose,
}: {
  rating: Rating,
  onClose: () => void,
}
) {
  return (
    <div className="p-3 h-fit max-h-[80dvh] w-[90dvw] max-w-2xl bg-white rounded-3xl border border-black flex flex-col gap-1 font-sans overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-2 flex-wrap">
          {rating.location && <div className="px-1 text-zinc-700 border border-zinc-600 rounded-md text-sm flex gap-0.5 items-center"><FaMountainCity /> {rating.location}</div>}
          {rating.category && <div className="px-1 text-zinc-700 border border-zinc-600 rounded-md text-sm flex gap-0.5 items-center"><MdOutlineDashboardCustomize /> {rating.category}</div>}
          <RatingPills rating={rating} />
        </div>
        <div className="text-2xl flex flex-col gap-2">
          <div className="click-cmp"
            onClick={onClose}
          >
            <MdCloseFullscreen />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-lg mt-2">
        <div className="flex gap-2">
          <div className="w-8 flex justify-end">
            <div className={`${kaisei.variable} jp-scroll text-sm border border-black rounded-full size-7 grid place-content-center`}>名</div>
          </div>
          <div>{rating.name}</div>
        </div>
        {
          rating.engName
          &&
          <div className="flex gap-2">
            <div className="w-8 flex justify-end">
              <div className={`text-sm border border-black rounded-full size-7 grid place-content-center`}>🔤</div>
            </div>
            <div>{rating.engName}</div>
          </div>
        }
        <div className="flex gap-2">
          <div className="w-8 flex justify-end">
            <div className={`text-sm border border-black rounded-full size-7 grid place-content-center`}>📍</div>
          </div>
          <div>{rating.address ? rating.address : "No address found"}</div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 flex justify-end">
            <div className={`text-sm border border-black rounded-full size-7 grid place-content-center`}>🔗</div>
          </div>
          <div className="flex flex-col">
            {
              rating.gmapsUrl &&
              <a className="decoration-blue-400 underline hover:cursor-pointer" href={rating.gmapsUrl}>Google Maps</a>
            }
            {
              rating.tabeUrl &&
              <a className="decoration-blue-400 underline hover:cursor-pointer" href={rating.tabeUrl}>Tabelog</a>
            }
            {
              rating.naverUrl &&
              <a className="decoration-blue-400 underline hover:cursor-pointer" href={rating.naverUrl}>Naver</a>
            }
            {
              !rating.gmapsUrl && !rating.tabeUrl && !rating.naverUrl && "No map links found"
            }
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 flex justify-end">
            <div className={`text-sm border border-black rounded-full size-7 grid place-content-center`}>
              <div style={{
                width: "14px",
                position: "relative",
                aspectRatio: "1 / 1"
              }}
              >

                <Image unoptimized src="/favicon/favicon-32x32.png" alt="logo" fill />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {
              rating.linksRead && rating.linksRead.length
                ?
                rating.linksRead.map(({ title, url }) => (
                  <a key={title} className="decoration-blue-400 underline hover:cursor-pointer" href={url}>"{title}"</a>
                ))
                : "No blog links found"
            }
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 flex justify-end">
            <div className={`text-sm border border-black rounded-full size-7 grid place-content-center`}>👀</div>
          </div>
          <div className="flex">
            {
              rating.notes
                ?
                <span>{rating.notes}</span>
                :
                "No notes"
            }
          </div>
        </div>
      </div>
      {
        rating.imgUrl
        &&
        <div className="flex justify-center mt-3">
          <div
            className="border border-black rounded-md"
            style={{
              width: "100%",
              position: "relative",
              aspectRatio: `${rating.imgWidth} / ${rating.imgHeight}`,
            }}
          >
            <Image
              fill
              src={rating.imgUrl}
              alt={rating.name}
              title={rating.name}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default function Ratings({ ratings }: Props) {
  const [viewingRating, setViewingRating] = useState<number>(-1);
  function renderNextImage(
    { alt = "", title }: RenderImageProps,
    { photo, width, height, index }: RenderImageContext,
  ) {
    return (
      <div
        className="border border-black relative hover:scale-105 hover:cursor-pointer duration-150 transition-all active:scale-90"
      >
        {
          <>
            <div
              className="absolute size-full flex flex-col justify-between items-center gap-1 z-5"
              onClick={(evt) => {
                setViewingRating(index);
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
                // setShowScreen(true);
                setViewingRating(index);
                evt.preventDefault();
              }}
            >
              {ratings[index].rating}
            </div>
          </>
        }
        <Image
          src={photo}
          alt={alt}
          title={title}
          width={Math.round(width)}
          height={Math.round(height)}
          style={{ width: "100%", height: "auto" }}
          placeholder={"blurDataURL" in photo ? "blur" : undefined}
        />
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

  function DropDownCity() {
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
          <div><FaMountainCity /></div>
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
            {cits.map(cit => (
              <div
                key={cit}
                className="w-full flex gap-4 items-center click-icon"
                onClick={(ev) => {
                  const inputElem = ev.currentTarget.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
                  inputElem[0].checked = !inputElem[0].checked;
                }}
              >
                <div className="h-full">
                  <input
                    name={cit}
                    type="checkbox"
                    className="scale-200"
                    defaultChecked={citsFilter?.has(cit.toLowerCase())}
                    onClick={(ev) => {
                      ev.currentTarget.checked = !ev.currentTarget.checked;
                    }} />
                </div>
                <div className="py-2 text-left">
                  {cit}
                </div>
              </div>
            ))}
          </div>
          <div className="px-2 flex gap-1.5 text-center">
            <div
              className="w-full lg-button click-cmp"
              onClick={() => {
                const checkboxes = listRef.current?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
                const newCits = Array.from(checkboxes).filter(elem => elem.checked).map(elem => elem.name);
                const searchParams = new URLSearchParams({ t: newCits.join(',').toLowerCase() });
                if (c) searchParams.append('c', c)
                window.location.href = '/ratings' + (searchParams.size ? '?' + searchParams.toString() : '');
              }}
            >
              Apply
            </div>
            <div
              className="w-full lg-button click-cmp"
              onClick={() => {
                window.location.href = '/ratings';
              }}
            >
              Reset
            </div>
          </div>
        </div>
      }
    </div>
  }

  function DropDownCats() {
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
          <div><MdOutlineDashboardCustomize /></div>
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
              className="w-full lg-button click-cmp"
              onClick={() => {
                const checkboxes = listRef.current?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
                const newCats = Array.from(checkboxes).filter(elem => elem.checked).map(elem => elem.name);
                const searchParams = new URLSearchParams({ c: newCats.join(',').toLowerCase() });
                if (t) searchParams.append('t', t)
                window.location.href = '/ratings' + (searchParams.size ? '?' + searchParams.toString() : '');
              }}
            >
              Apply
            </div>
            <div
              className="w-full lg-button click-cmp"
              onClick={() => {
                window.location.href = '/ratings';
              }}
            >
              Reset
            </div>
          </div>
        </div>
      }
    </div>
  }

  useEffect(() => {
    if (viewingRating >= 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [viewingRating]);

  const catSet = new Set<string>()
  const citSet = new Set<string>()
  ratings.forEach(r => {
    catSet.add(r.category)
    citSet.add(r.location)
  })
  const cats = Array.from(catSet);
  const cits = Array.from(citSet).filter(t => !!t);

  const router = useRouter();
  const initParams = router.query as { c: string, s: string, t: string };
  const c = initParams.c;
  const s = initParams.s;
  const t = initParams.t;

  const catsFilter = c ? new Set<string>(c.toLowerCase().split(',')) : null;
  const citsFilter = t ? new Set<string>(t.toLowerCase().split(',')) : null;
  ratings = ratings.filter(r => !catsFilter || catsFilter.has(r.category.toLowerCase())).filter(r => !citsFilter || citsFilter.has(r.location?.toLowerCase()));;
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
          <section className="relative pb-16 flex justify-center">
            <div className="max-w-4xl">
              <div className="text-2xl font-bold text-center">All Ratings</div>
              <div className="h-12 py-2 flex justify-center gap-2 font-sans">
                <DropDownCity />
                <DropDownCats />
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
              />
            </div>
          </section>
        </Container>
        <div className="z-50 fixed bottom-0 w-full flex flex-col gap-y-2 justify-items-center place-items-center">
          <Footer />
        </div>
        {
          viewingRating >= 0
          &&
          <div
            className="fixed top-0 h-dvh w-full z-30 backdrop-blur-2xl grid place-content-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setViewingRating(-1);
            }}
          >
            <Modal
              rating={ratings[viewingRating]}
              onClose={() => setViewingRating(-1)}
            />
            <div className="absolute bottom-0 w-full justify-center mb-14 flex">
              <div className="bg-white border border-black rounded-md flex gap-2 text-2xl px-2 py-1">
                {
                  viewingRating === 0
                    ?
                    <div className="opacity-30">
                      <FaArrowLeft />
                    </div>
                    :

                    <div className="click-cmp"
                      onClick={() => setViewingRating(current => current - 1)}
                    >
                      <FaArrowLeft />
                    </div>
                }
                {
                  viewingRating === ratings.length - 1
                    ?
                    <div className="opacity-30">
                      <FaArrowRight />
                    </div>
                    :
                    <div className="click-cmp"
                      onClick={() => setViewingRating(current => current + 1)}
                    >
                      <FaArrowRight />
                    </div>
                }
              </div>
            </div>
          </div>
        }
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
