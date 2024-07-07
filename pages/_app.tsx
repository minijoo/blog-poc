import { AppProps } from "next/app";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "../styles/index.css";
import { Crimson_Text } from "next/font/google";
import { useLayoutEffect, useRef } from "react";
import {
  getMainScrollHeight,
  setMainScrollHeight,
} from "../components/height-observer";

const crimson = Crimson_Text({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-crimson",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    setMainScrollHeight(ref.current.scrollHeight);
    // Only place/way I know /how for getting scrollable height of body/html
  });
  return (
    <main className={`${crimson.variable} font-serif`} ref={ref}>
      <Component {...pageProps} />
    </main>
  );
}
