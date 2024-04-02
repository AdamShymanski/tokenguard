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

export default function Chart({ data, dateRange }) {
  const [startIndex, setStartIndex] = useState(0);
  let chartArr = useRef([])

  useEffect(() => {
    chartArr = data.ethereum.map((item, index) => {
      return {
        date: item.date,
        Ethereum: item.value,
        Solana: data.solana[index].value,
      };
    });

    switch (dateRange) {
      case 0:
        setStartIndex(7);
        break;
      case 1:
        setStartIndex(14);
        break;
      case 2:
        setStartIndex(28);
        break;
      case 3:
        setStartIndex(92);
        break;
      case 4:
        setStartIndex(10000);
    }

    console.log(chartDate);
  }, []);

  if (!data.ethereum || !chartArr) return null;

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
          travellerWidth={10}
          // startIndex={() =>
          //   chartArr.length() - chartDate >= 0
          //     ? chartArr.length() - chartDate
          //     : 0
          // }
          // endIndex={() => chartArr.length()}
          startIndex={33}
        />

        <Tooltip formatter={(label) => label + " GI"} />

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
