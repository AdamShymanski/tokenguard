import React, { useRef, useState, useMemo, useEffect } from "react";

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Brush,
  ResponsiveContainer,
} from "recharts";

import Image from "next/image";

import solana_icon from "./../../public/icons/solana_icon_v1.png";
import ethereum_icon from "./../../public/icons/ethereum_icon.png";

export default function Chart({ data, startIndex }) {
  const [chartArr, setChartArr] = useState([]);

  useEffect(() => {
    setChartArr(() =>
      data.ethereum.map((item, index) => {
        return {
          date: item.date,
          Ethereum: item.value,
          Solana: data.solana[index].value,
        };
      })
    );
  }, [data.ethereum, data.solana]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip text-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <p
            className="label"
            style={{
              color: "#384354",
              marginBottom: "4px",
              fontFamily: "",
              fontWeight: "bold",
              marginBotttom: 8,
            }}
          >
            {new Date(label).toLocaleDateString()} {/* Format date */}
          </p>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 12 }}
          >
            <Image
              src={ethereum_icon}
              alt="Ethereum Icon"
              className="h-10 w-auto pr-4"
            />
            <p
              className="ethereum"
              style={{
                color: "#384354",
                marginBottom: "4px",
                fontWeight: "semibold",
              }}
            >
              {`- ${payload[0].value}`}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={solana_icon}
              alt={"Solana Icon"}
              className="h-auto w-3 pr-4"
            />
            <p
              className="solana"
              style={{
                color: "#384354",
                marginBottom: "4px",
                fontWeight: "semibold",
              }} // Add font weight bold
            >
              {`- ${payload[1].value}`}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!data?.ethereum || !chartArr?.length) return null;

  return (
    <ResponsiveContainer width={"100%"} height={340}>
      <AreaChart
        data={chartArr}
        layout="horizontal"
        margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B63FB" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B63FB" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3886FB" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3886FB" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis name="Date" tick={{ fontSize: 12 }} />

        <CartesianGrid strokeDasharray="3 3" />
        <Brush
          stroke={"#5F80FF"}
          fill={"#F7F9FB"}
          travellerWidth={10}
          endIndex={chartArr.length - 1}
          startIndex={
            chartArr.length - startIndex - 3 >= 0
              ? chartArr.length - startIndex - 3
              : 0
          }
        />

        {/* <Tooltip formatter={(label) => label + " GI"} /> */}
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="Ethereum"
          stroke="#3B63FB"
          fillOpacity={1}
          fill="url(#colorUv)"
          name="Ethereum"
        />
        <Area
          type="monotone"
          dataKey="Solana"
          stroke="#3886FB"
          fillOpacity={1}
          fill="url(#colorPv)"
          name="Solana"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
