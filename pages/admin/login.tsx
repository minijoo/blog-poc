import { MouseEventHandler, useState } from "react";
import { JordysAPI } from "../../lib/jordys-api";
import { AuthenticationError } from "../../interfaces/jordys-api";
import { useRouter } from "next/router";

export default function LoginPage({ ip }) {
  const redirPath = useRouter().query["redirectPath"];
  // console.log(redirPath);
  const Jordys_API = new JordysAPI(ip);

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const target = e.target as HTMLButtonElement;
    target.setAttribute("disabled", "");
    const formElement = document.getElementById(
      "login-form"
    ) as HTMLFormElement;
    try {
      await Jordys_API.login(new FormData(formElement));
      console.log("sign in complete");
      setGreenMessage(
        `Login successful. Redirecting to /${
          redirPath ? redirPath : "admin"
        } in 3 seconds..`
      );
      // @ts-ignore
      document.getElementById("green-popover").showPopover();
      setTimeout(() => {
        window.location.replace(redirPath ? "/" + redirPath : "/admin");
        setGreenMessage("Redirect!");
        // @ts-ignore
        document.getElementById("green-popover").showPopover();
      }, 3000);
    } catch (err) {
      if (err instanceof AuthenticationError) {
        target.removeAttribute("disabled");
        setRedMessage("Username or password incorrect. 🧐");
        // @ts-ignore
        document.getElementById("red-popover").showPopover();
        return;
      }
      alert("Unexpected error during login");
      console.log(err);
    }
    e.preventDefault();
  };

  const [greenPopoverMessage, setGreenMessage] = useState("");
  const [redPopoverMessage, setRedMessage] = useState("");

  return (
    <div className="h-dvh w-dvw flex justify-center">
      <div
        className="fixed bottom-0 bg-red-200 rounded-md px-2"
        popover="auto"
        id="red-popover"
      >
        {redPopoverMessage}
      </div>
      <div
        className="fixed bottom-0 bg-green-200 rounded-md px-2"
        popover="auto"
        id="green-popover"
      >
        {greenPopoverMessage}
      </div>
      <div className="relative w-48 mt-[20dvh]">
        <div className="w-full text-2xl text-center">Login</div>
        {/* {isLoggingIn ? (
          <div className="absolute top-0 w-full h-full flex place-content-center items-center bg-white/90 z-50">
            <div className="text-lg">logging in...</div>
          </div>
        ) : (
          <></>
        )}
        <div className="p-5 text-2xl border-b">Upload</div> */}
        <form
          method="POST"
          id="login-form"
          className="grid grid-flow-row grid-cols-1 gap-2 w-full"
        >
          <section className="col-span-1">
            <label htmlFor="email">Email</label>
            <input
              className="w-full border-black border-1 py-2 px-1 rounded"
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              autoCapitalize="none"
              required
              autoFocus
            />
          </section>
          <section className="col-span-1">
            <label htmlFor="current-password">Password</label>
            <input
              className="w-full border-black border-1 py-2 px-1 rounded"
              id="current-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </section>
          <button
            className="text-center col-span-1 h-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded disabled:opacity-20"
            type="submit"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return { props: { ip: process.env.IP || "" } };
}
