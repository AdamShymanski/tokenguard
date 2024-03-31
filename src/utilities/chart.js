import React, { useRef, useState, useMemo } from "react";

import * as d3 from "d3";

export default function Chart({ data }) {
  const margin = { top: 70, right: 60, bottom: 50, left: 80 };

  const parsedData = useMemo(() => {
    if (!data.ethereum) return [];
    return data.ethereum.map((d) => {
      return {
        Date: new Date(d.date),
        GrowthIndex: d.value,
      };
    });
  }, [data]);

  const width = 1600 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const x = d3.scaleTime().range([0, width]);
  x.domain(
    d3.extent(parsedData, function (d) {
      return d.Date;
    })
  );

  const y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    d3.max(parsedData, function (d) {
      return d.GrowthIndex;
    }) + 1,
  ]);

  const svgRef = useRef();

  const svg = d3.select("svg");
  const g = svg.append("g");
  g.call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  if (!data.ethereum) return null;

  return (
    <>
      <svg
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      ></svg>
    </>
  );
}
