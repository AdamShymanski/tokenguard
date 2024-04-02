"use client";

//packages
import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";

//utilities
// import DateSelector from "../utilities/dateSelector";
// const Chart = React.lazy(() => import("../utilities/chart"));
import Chart from "../utilities/chart";

//pngs
import charts from "./../../public/charts.png";

//icons
import x_icon from "./../../public/icons/x_icon.png";
import gi_icon from "./../../public/icons/gi_icon.png";
import bar_icon from "./../../public/icons/bar_icon.png";
import arrow_icon from "./../../public/icons/arrow_icon.png";
import solana_icon from "./../../public/icons/solana_icon.png";
import metrics_icon from "./../../public/icons/metrics_icon.png";
import compare_icon from "./../../public/icons/compare_icon.png";
import ethereum_icon from "./../../public/icons/ethereum_icon.png";
import calendar_icon from "./../../public/icons/calendar_icon.png";

export default function Home() {
  const [dateRange, setDateRange] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://api.tokenguard.io/db-api/growth-index/basic-timeline-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chainName: "ethereum",
        period: "last year",
        metric: "tg_growth_index",
        compareWith: ["solana"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData({
          ethereum: [...data.blockchain.tg_growth_index],
          solana: [...data.cumulative.tg_growth_index],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-start justify-start p-5 py-7 pb-10 bg-gradient-to-b from-10% from-green-100 via-30% via-slate-50 to-90% to-slate-100">
      <section className="flex flex-row items-center justify-center space-x-3">
        <Image src={metrics_icon} alt="Metrics Icon" className="w-4 h-4" />
        <h3 className="text-custom-grey font-semibold text-lg space-x-2">
          Other Metrics
        </h3>
      </section>
      <Image src={charts} alt="Charts" className="w-full mt-4" />

      <article className="flex flex-row relative items-center w-full border border-slate-300 rounded p-2 mt-5 bg-white drop-shadow">
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
              className="h-3 w-auto mr-2"
            />
            <p className="text-xs">COMPARE WITH</p>
          </div>
          <div className="flex flex-row items-center border border-slate-300 rounded px-4 py-2 mt-3 bg-white drop-shadow">
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
            <h1 className="text-3xl font-bold mr-4">78</h1>{" "}
            <div className="bg-green-200 px-2.5 py-[1px] rounded mb-1">
              <p className="text-green-700 text-xs tracking-tight">+ 12%</p>
            </div>
            <p className="text-xs mb-1 ml-2">{"/ 28 days"}</p>
          </div>

          <Image src={bar_icon} alt={"Bar Icon"} className="h-3 w-auto mt-1" />
        </aside>
      </div>

      <div className="flex flex-row align-items mt-8">
        <Image
          src={calendar_icon}
          alt={"Calendar Icon"}
          className="h-3 w-auto mr-2"
        />
        <p className="text-xs text-custom-grey">DATE RANGE</p>
      </div>

      {/* <DateSelector /> */}

      <aside className="flex flex-row items-center w-full justify-between border border-slate-200 rounded px-6 py-1.5 mt-3 mb-5 bg-slate-100  font-semibold text-slate-800 text-sm ">
        <div
          className={
            dateRange === 0
              ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5"
              : "px-3 py-0.5 mx-[1px]"
          }
          onClick={() => {
            setDateRange(0);
          }}
        >
          <p>1W</p>
        </div>
        <div
          className={
            dateRange === 1
              ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5"
              : "px-3 py-0.5 mx-[1px]"
          }
          onClick={() => {
            setDateRange(1);
          }}
        >
          <p>2W</p>
        </div>
        <div
          className={
            dateRange === 2
              ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5"
              : "px-3 py-0.5 mx-[1px]"
          }
          onClick={() => {
            setDateRange(2);
          }}
        >
          <p>4W</p>
        </div>
        <div
          className={
            dateRange === 3
              ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5"
              : "px-3 py-0.5 mx-[1px]"
          }
          onClick={() => {
            setDateRange(3);
          }}
        >
          <p>3M</p>
        </div>
        <div
          className={
            dateRange === 4
              ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5"
              : "px-3 py-0.5 mx-[1px]"
          }
          onClick={() => {
            setDateRange(4);
          }}
        >
          <p>ALL</p>
        </div>
      </aside>

      {data.ethereum ? <Chart data={data} dateRange={dateRange} /> : null}
      {/* <Suspense fallback={<div>Loading...</div>}>
      </Suspense> */}
    </main>
  );
}
