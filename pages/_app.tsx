import { AppProps } from "next/app";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "../styles/index.css";
import { Crimson_Pro } from "next/font/google";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${crimson.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
