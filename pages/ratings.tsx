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
import { useState } from "react";

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
                <div className="w-full px-1 bg-surface/80 shadow-lg shadow-black/5 bg-white/70 font-sans font-bold text-center">
                  {ratings[index].name}
                </div>
                <div className="w-full px-1 bg-surface/80 shadow-lg shadow-black/5 bg-white/70 font-sans font-bold text-center">
                  {ratings[index].category}
                </div>
              </div>
              <div className="absolute -translate-1/2 top-1/2 left-1/2 px-1 rounded-md border border-border bg-surface/80 shadow-lg shadow-black/5 bg-white/70 font-sans font-bold text-2xl">
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
                    <a className="button py-1 px-2 text-center bg-black/40" href={ratings[index].link}>Read blog</a>
                    :
                    <span>No blog entry</span>
                }
              </div>
            </div>
        }
      </div>
    );
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
      href: r.link ? r.link : '',
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
          <section className="relative">
            <div className="text-2xl font-bold text-center pb-2">All Ratings</div>
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
};
