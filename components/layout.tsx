import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

const COOKIE_NAME = "entered-jordys-site";
const env = process.env.NODE_ENV;
const counterKey = env === "development" ? "dev_counter" : "visit_counter";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const onEntry = async (hasEntered) => {
  fetch(`https://api.api-ninjas.com/v1/counter?id=${counterKey}&hit=true`, {
    headers: {
      "X-Api-Key": "v9YXK1HI5TDys8z0Azf1mg==cg8Iy54a591nROCr", // @TODO put api key somewhere outside of codebase
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((_) => {})
    .catch((err) => {
      console.log("There was an error hitting counter endpoint", err);
    });
};

const Layout = ({ preview, children }: Props) => {
  const [hasEntered, setHasEntered] = useState(true);
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  useEffect(() => {
    if (hasEntered && cookies[COOKIE_NAME] === 1) {
      // Entered state being true means this is being run on load, not on click of entry
      // And if cookie exists on load, i.e. site is visited before last cookie expired
      // Then refresh cookie
      setCookie(COOKIE_NAME, 1, { maxAge: 60 * 60 * 24 * 3 });
    }
    // Regardless of cookie set on load or on click, set entered state accordingly.
    // (Technically we never remove or set cookie to 0 so this is always making entered state true)
    // (How is cookie removed? via TTL which does not invoke this hook)
    setHasEntered(cookies[COOKIE_NAME] === 1);
  }, [cookies]);
  if (!hasEntered) {
    return (
      <>
        <div className="text-white fixed h-full w-full bg-black z-49 place-content-center flex items-center">
          <div className="grid grid-rows-2">
            <div className="row-span-1">
              <div
                className="text-3xl py-1 px-2 hover:bg-white hover:text-black"
                onClick={() => {
                  setCookie(COOKIE_NAME, 1, { maxAge: 60 * 60 * 24 * 3 }); // This will inovke useEffect
                  onEntry(hasEntered); // Only do this when entry button is actively clicked
                }}
              >
                Click to Enter
              </div>
            </div>
            <div className="row-span-1 text-center">
              <small>This site uses cookies.</small>
            </div>
          </div>
        </div>
        <button
          className="z-50 bg-black absolute"
          onClick={() => {
            setCookie(COOKIE_NAME, 1, { maxAge: 60 * 60 * 24 * 3 }); // This will inovke useEffect
          }}
        >
          bp
        </button>
      </>
    );
  }

  return (
    <>
      <Meta />
      <div className="min-h-dvh">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      {/* <Footer /> TODO: think about a different layout component for index vs other pages*/}
    </>
  );
};

export default Layout;
