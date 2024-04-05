import { AppProps } from "next/app";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "../styles/index.css";
import { Crimson_Text } from "next/font/google";

const crimson = Crimson_Text({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-crimson",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${crimson.variable} font-serif`}>
      <Component {...pageProps} />
    </main>
  );
}
