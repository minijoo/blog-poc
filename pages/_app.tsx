import { AppProps } from "next/app";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "../styles/index.css";
import "react-photo-album/columns.css";
import { Crimson_Text } from "next/font/google";

const crimson = Crimson_Text({ weight: "400", subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${crimson.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
