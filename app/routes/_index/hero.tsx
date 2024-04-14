import { lazy, Suspense } from "react";

import { Spotlight } from "~/components/spotlight";
import { BackgroundBeams } from "~/components/background-beams";
import Header from "./components/header";
import { CountDown } from "./components/count-down";
import { ClientOnly } from "~/utils/client-only";

const Earth = lazy(() => import("./components/earth"));

export default function Hero() {
  return (
    <div className="flex flex-col w-full min-h-screen relative">
      <Header />
      <Spotlight
        fill="white"
        className="-top-40 left-0 md:left-60 md:-top-20 xl:-top-60 xl:left-80"
      />
      <div className="flex-1 max-w-7xl mx-auto px-8 w-full py-16 relative grid grid-cols-2">
        <div>
          <CountDown />
          <h1 className="mt-6 text-6xl font-extrabold leading-[1.2]">
            International Healthcare Engineering Forum 2024
          </h1>
          <p className="mt-4 text-xl font-semibold">
            Embracing the Future : SMART Healthcare in 2030
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe3VbJjBUqhNDj_NVsJLdBhXihjzdkbs3vMc0G3kPw0iD0GZQ/viewform"
              className="font-semibold px-4 py-3 bg-gradient-to-r from-indigo-700 to-blue-700 rounded-lg hover:from-indigo-600 hover:to-blue-600 border-2 border-indigo-600 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register as an exhibitor
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc485Ql0k9kBXLhiznWDldn_tb05rknkUC3uUmaoet1_K88Hw/viewform"
              className="font-semibold px-4 py-3 border-2 border-neutral-950 rounded-lg bg-black hover:bg-neutral-950 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Interested in becoming an exhibitor?
            </a>
          </div>
        </div>
        <ClientOnly>
          <Suspense>
            <Earth />
          </Suspense>
        </ClientOnly>
      </div>
      <ClientOnly>
        <BackgroundBeams className="-z-10" />
      </ClientOnly>
    </div>
  );
}
