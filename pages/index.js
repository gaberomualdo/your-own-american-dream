import Head from "next/head";
import { makeTitle } from "../lib/util";

export default function Home() {
  return (
    <>
      <Head>
        <title>{makeTitle("")}</title>
      </Head>
      <div
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full"
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
          }}
          class="w-full min-h-screen flex flex-col justify-center items-center text-white"
        >
          <img
            src="logo-main.png"
            className="px-3 w-full h-auto md:w-auto md:h-40"
          />
          <h2 className="text-xl md:text-2xl mt-5 px-3 mb-10 font-bold text-center">
            Play your way to the American Dream through famous literature
          </h2>
          <p
            className="mx-2 max-w-3xl px-5 py-4 rounded-md leading-relaxed shadow"
            style={{
              backgroundColor: "rgba(0,0,0,.35)",
            }}
          >
            Your Own American Dream is a simple online game and experience that
            allows players to experience the journey of achieving the American
            Dream through the perspectives, quotes, and stories of famous
            characters throughout American literature. We're releasing soon, so
            stay tuned for updates!
          </p>
          <p
            className="fixed bottom-2 left-1/2 text-sm opacity-80 w-full text-center"
            style={{
              transform: "translateX(-50%)",
            }}
          >
            &copy; Gabriel Romualdo &amp; Daniel Xiao
          </p>
        </div>
      </div>
    </>
  );
}
