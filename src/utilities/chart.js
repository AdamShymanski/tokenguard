import React, { useState, useEffect } from "react";

import {
  AreaChart,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Line,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { TbCurrencyEthereum } from "react-icons/tb";
import { TbCurrencySolana } from "react-icons/tb";

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
            width: "120px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Add drop shadow
          }}
        >
          <p
            className="label"
            style={{
              color: "#384354",
              marginBottom: "4px",
              fontFamily: "",
              fontWeight: "bold",
              marginBotttom: 12,
            }}
          >
            {new Date(label).toLocaleDateString()} {/* Format date */}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "6px",
              flexDirection: "row",
            }}
          >
            <TbCurrencyEthereum size={22} color="#58D2B5" />
            <p
              className="ethereum"
              style={{
                color: "#384354",
                fontWeight: "medium",
                fontSize: "0.77rem",
              }}
            >
              {` - ${payload[0].value}`}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "6px",
              flexDirection: "row",
            }}
          >
            <TbCurrencySolana size={22} color="#3886FB" />
            <p
              className="solana"
              style={{
                color: "#384354",

                fontWeight: "medium",
                fontSize: "0.77rem",
              }}
            >
              {` - ${payload[1].value}`}
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
      <LineChart
        data={chartArr}
        layout="horizontal"
        margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
      >
        {/* <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#48E9C2" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#48E9C2" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3886FB" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3886FB" stopOpacity={0} />
          </linearGradient>
        </defs> */}

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

        <Tooltip content={<CustomTooltip />} />

        <Line
          type="monotone"
          dataKey="Ethereum"
          stroke="#48E9C2"
          fillOpacity={1}
          fill="url(#colorUv)"
          name="Ethereum"
        />
        <Line
          type="monotone"
          dataKey="Solana"
          stroke="#3886FB"
          fillOpacity={1}
          fill="url(#colorPv)"
          name="Solana"
        />
      </LineChart>
    </ResponsiveContainer>
  );
  // return (
  //   <ResponsiveContainer width={"100%"} height={340}>
  //     <AreaChart
  //       data={chartArr}
  //       layout="horizontal"
  //       margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
  //     >
  //       <defs>
  //         <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
  //           <stop offset="5%" stopColor="#48E9C2" stopOpacity={0.8} />
  //           <stop offset="95%" stopColor="#48E9C2" stopOpacity={0} />
  //         </linearGradient>
  //         <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
  //           <stop offset="5%" stopColor="#3886FB" stopOpacity={0.8} />
  //           <stop offset="95%" stopColor="#3886FB" stopOpacity={0} />
  //         </linearGradient>
  //       </defs>

  //       <XAxis dataKey="date" tick={{ fontSize: 12 }} />
  //       <YAxis name="Date" tick={{ fontSize: 12 }} />

  //       <CartesianGrid strokeDasharray="3 3" />
  //       <Brush
  //         stroke={"#5F80FF"}
  //         fill={"#F7F9FB"}
  //         travellerWidth={10}
  //         endIndex={chartArr.length - 1}
  //         startIndex={
  //           chartArr.length - startIndex - 3 >= 0
  //             ? chartArr.length - startIndex - 3
  //             : 0
  //         }
  //       />

  //       <Tooltip content={<CustomTooltip />} />

  //       <Area
  //         type="monotone"
  //         dataKey="Ethereum"
  //         stroke="#48E9C2"
  //         fillOpacity={1}
  //         fill="url(#colorUv)"
  //         name="Ethereum"
  //       />
  //       <Area
  //         type="monotone"
  //         dataKey="Solana"
  //         stroke="#3886FB"
  //         fillOpacity={1}
  //         fill="url(#colorPv)"
  //         name="Solana"
  //       />
  //     </AreaChart>
  //   </ResponsiveContainer>
  // );
}
