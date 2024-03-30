"use client";

import Image from "next/image";

//pngs
import charts from "./../../public/charts.png";

//icons
import metrics_icon from "./../../public/icons/metrics_icon.png";
import ethereum_icon from "./../../public/icons/ethereum_icon.png";
import solana_icon from "./../../public/icons/solana_icon.png";
import x_icon from "./../../public/icons/x_icon.png";
import arrow_icon from "./../../public/icons/arrow_icon.png";
import compare_icon from "./../../public/icons/compare_icon.png";
import gi_icon from "./../../public/icons/gi_icon.png";
import bar_icon from "./../../public/icons/bar_icon.png";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-start justify-start p-5 py-7 bg-gradient-to-b from-10% from-green-100 via-30% via-slate-100 to-90% to-slate-100">
      <section className="flex flex-row justify-center space-x-3">
        <Image src={metrics_icon} alt="Metrics Icon" className="w-5 h-5" />
        <h3 className="text-custom-grey font-semibold text-lg space-x-2">
          Other Metrics
        </h3>
      </section>
      <Image src={charts} alt="Charts" className="w-full mt-4" />

      <article className="flex flex-row relative items-center w-full border border-slate-300 rounded p-2 mt-5 bg-white drop-shadow-md">
        <Image
          src={ethereum_icon}
          alt="Ethereum Icon"
          className="h-10 w-auto pr-4"
        />
        <div className="flex flex-col text-custom-grey">
          <h2 className="flex flex-row items-baseline text-xl font-semibold">
            Ethereum <span className="text-sm ml-2"> Growth Index</span>
          </h2>
          <p className="font-light text-sm">{"[ETH]"}</p>
        </div>

        <Image
          src={arrow_icon}
          alt="Arrow Icon"
          className="w-auto h-3 absolute right-6"
        />
      </article>
      <div className="flex flex-row justify-between w-full">
        <aside className="text-custom-grey mt-8">
          <div className="flex flex-row items-center">
            <Image
              src={compare_icon}
              alt="Compare Icon"
              className="h-3 w-auto pr-2"
            />
            <p className="text-xs">COMPARE WITH</p>
          </div>
          <div className="flex flex-row items-center border border-slate-300 rounded px-4 py-2 mt-3 bg-white drop-shadow-md">
            <Image
              src={solana_icon}
              alt={"Solana Icon"}
              className="h-4 w-auto pr-4"
            />
            <Image src={x_icon} alt={"Close Icon"} className="h-2.5 w-auto" />
          </div>
        </aside>
        <aside className="flex flex-col items-start text-custom-grey mt-8">
          <div className="flex flex-row items-center">
            <Image
              src={gi_icon}
              alt={"Growth Index Icon"}
              className="h-3 w-auto pr-2"
            />
            <p className="text-xs">GROWTH INDEX</p>
          </div>
          <div className="flex flex-row items-end w-full mt-2">
            <h1 className="text-3xl font-bold mr-2">78</h1>{" "}
            <div className="bg-green-200  px-2  rounded mb-1">
              <p className="text-green-700 text-xs tracking-tight">+ 12%</p>
            </div>
            <p className="text-xs">{"  / 28 days"}</p>
          </div>

          <Image src={bar_icon} alt={"Bar Icon"} className="h-3 w-auto mt-1" />
        </aside>
      </div>
    </main>
  );
}
