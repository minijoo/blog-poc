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
    setHasEntered(cookies[COOKIE_NAME] === 1);
  }, [cookies]);
  if (!hasEntered) {
    return (
      <>
        <div className="text-white fixed h-full w-full bg-black z-50 place-content-center flex items-center">
          <div className="grid grid-rows-2">
            <div className="row-span-1">
              <div
                className="text-3xl py-1 px-2 hover:bg-white hover:text-black"
                onClick={() => {
                  setHasEntered(true);
                  setCookie(COOKIE_NAME, 1, { maxAge: 60 * 24 });
                  onEntry(hasEntered);
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
      </>
    );
  }

  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
