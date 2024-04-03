"use client";

//packages
import React, {
  Suspense,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import axios from "axios";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

//utilities
const Chart = React.lazy(() => import("../utilities/chart"));
import DateSelector from "../utilities/dateSelector";

//pngs
import charts from "./../../public/charts.png";
import charts_v1 from "./../../public/charts_v1.png";

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
  const [data, setData] = useState({});
  const [dateRange, setDateRange] = useState(4);
  const [growthIndex, setGrowthIndex] = useState(0);
  const [growthPercentile, setGrowthPercentile] = useState(0);

  const [viewportSizeChange, setViewportSizeChange] = useState(
    typeof window !== undefined ? window.innerWidth > 540: false
  );
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 540 });

  useEffect(() => {
    setViewportSizeChange(isDesktopOrLaptop);
  }, [isDesktopOrLaptop]);

  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://api.tokenguard.io/db-api/growth-index/basic-timeline-data"
    );

  useEffect(() => {
    axios
      .post(url, {
        chainName: "ethereum",
        period: "last year",
        metric: "tg_growth_index",
        compareWith: ["solana"],
      })
      .then((response) => {
        const data = response.data;
        setData({
          ethereum: [...data.blockchain.tg_growth_index],
          solana: [...data.cumulative.tg_growth_index],
        });
        setGrowthIndex(
          Math.round(
            data.blockchain.tg_growth_index[
              data.blockchain.tg_growth_index.length - 1
            ].value
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const startIndex = useMemo(() => {
    if (!data?.ethereum) return 0;

    const firstDate = new Date(data.ethereum[0].date);

    let targetDate;
    switch (dateRange) {
      case 0:
        targetDate = new Date(firstDate);
        targetDate.setDate(targetDate.getDate() + 7);
        break;
      case 1:
        targetDate = new Date(firstDate);
        targetDate.setDate(targetDate.getDate() + 14);
        break;
      case 2:
        targetDate = new Date(firstDate);
        targetDate.setDate(targetDate.getDate() + 28);
        break;
      case 3:
        targetDate = new Date(firstDate);
        targetDate.setMonth(targetDate.getMonth() + 3);
        break;
      case 4:
        let growth =
          ((data.ethereum[0].value -
            data.ethereum[data.ethereum.length - 1].value) /
            data.ethereum[0].value) *
          100;
        growth = Math.round(growth);

        setGrowthPercentile(growth);
        return 1000;
      default:
        return 0;
    }

    for (let i = data.ethereum.length - 1; i >= 0; i--) {
      if (new Date(data.ethereum[i].date) < targetDate) {
        let growth =
          ((data.ethereum[0].value - data.ethereum[i + 1].value) /
            data.ethereum[0].value) *
          100;

        growth = Math.round(growth);

        setGrowthPercentile(growth);
        return i;
      }
    }
  }, [dateRange, data]);

  const dateRangeToDays = useCallback(() => {
    switch (dateRange) {
      case 0:
        return "7 days";
      case 1:
        return "14 days";
      case 2:
        return "28 days";
      case 3:
        return "90 days";
      case 4:
        return "ALL";
      default:
        return "-";
    }
  }, [dateRange]);

  const RenderProcentile = () => {
    if (growthPercentile >= 0) {
      return (
        <div className="flex flex-row items-end w-full mt-2">
          <h1 className="text-2xl font-bold mr-2">{growthIndex}</h1>{" "}
          <div className="bg-green-200 px-2.5 py-[1px] rounded mb-1">
            <p className="text-green-700 text-xs tracking-tight">
              + {growthPercentile}%
            </p>
          </div>
          <p className="text-[0.65rem] mb-1 ml-2">/ {dateRangeToDays()}</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-end w-full mt-2">
          <h1 className="text-2xl font-bold mr-2">{growthIndex}</h1>{" "}
          <div className="bg-red-200 px-2.5 py-[1px] rounded mb-1">
            <p className="text-red-700 text-xs tracking-tight">
              - {Math.abs(growthPercentile)}%
            </p>
          </div>
          <p className="text-[0.65rem] mb-1 ml-2">/ {dateRangeToDays()}</p>
        </div>
      );
    }
  };

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-start justify-start p-5 py-7 pb-10 bg-gradient-to-b from-10% from-green-100 via-30% via-slate-50 to-90% to-slate-100 max-w-[890px]">
      <section className="flex flex-row items-center justify-center space-x-3">
        <Image src={metrics_icon} alt="Metrics Icon" className="w-4 h-4 " />
        <h3 className="text-custom-gray font-semibold text-lg space-x-2">
          Other Metrics
        </h3>
      </section>
      <Suspense>
        {viewportSizeChange ? (
          <Image
            src={charts_v1}
            alt="Charts"
            className="w-full mt-4 max-h-18"
          />
        ) : (
          <Image src={charts} alt="Charts" className="w-full mt-4 max-h-18" />
        )}
      </Suspense>

      <article className="flex flex-row relative items-center w-full border border-slate-300 rounded p-2 mt-10 bg-white drop-shadow cursor-pointer">
        <Image
          src={ethereum_icon}
          alt="Ethereum Icon"
          className="h-10 w-auto pr-4"
        />
        <div className="flex flex-col text-custom-gray">
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
        <aside className="text-custom-gray mt-8">
          <div className="flex flex-row items-center">
            <Image
              src={compare_icon}
              alt="Compare Icon"
              className="h-3 w-auto mr-2"
            />
            <p className="text-xs">COMPARE WITH</p>
          </div>
          <div className="flex flex-row items-center border border-slate-300 rounded px-4 py-2 mt-3 bg-white drop-shadow cursor-pointer">
            <Image
              src={solana_icon}
              alt={"Solana Icon"}
              className="h-4 w-auto pr-4"
            />
            <Image src={x_icon} alt={"Close Icon"} className="h-2.5 w-auto" />
          </div>
        </aside>
        <aside className="flex flex-col items-start text-custom-gray mt-8">
          <div className="flex flex-row items-center">
            <Image
              src={gi_icon}
              alt={"Growth Index Icon"}
              className="h-3 w-auto pr-2"
            />
            <p className="text-xs">GROWTH INDEX</p>
          </div>
          <RenderProcentile />

          <Image
            src={bar_icon}
            alt={"Bar Icon"}
            className="h-3.5 w-auto mt-1"
          />
        </aside>
      </div>

      <div className="flex flex-row align-items mt-8">
        <Image
          src={calendar_icon}
          alt={"Calendar Icon"}
          className="h-3 w-auto mr-2"
        />
        <p className="text-xs text-custom-gray">DATE RANGE</p>
      </div>

      <DateSelector dateRange={dateRange} setDateRange={setDateRange} />

      <Suspense
        fallback={<div className="text-custom-gray mt-4">Loading...</div>}
      >
        {data?.ethereum ? (
          <Chart data={data} startIndex={startIndex} />
        ) : (
          <div className="text-custom-gray mt-4">Loading...</div>
        )}
      </Suspense>
    </main>
  );
}
