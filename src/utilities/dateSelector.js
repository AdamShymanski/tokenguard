import React from "react";

export default function DateSelector({ setDateRange, dateRange }) {
  const dateRanges = [
    { value: 0, label: "1W" },
    { value: 1, label: "2W" },
    { value: 2, label: "4W" },
    { value: 3, label: "3M" },
    { value: 4, label: "ALL" },
  ];

  return (
    <aside className="flex flex-row items-center w-full justify-between border border-slate-200 rounded px-6 py-1.5 mt-3 mb-5 bg-slate-100  font-semibold text-slate-800 text-sm">
      {dateRanges.map(({ value, label }) => (
        <div
          key={value}
          className={
            dateRange === value
              ? "bg-white drop-shadow border rounded border-slate-300 px-3 py-0.5 cursor-pointer"
              : "px-3 py-0.5 mx-[1px] cursor-pointer"
          }
          onClick={() => setDateRange(value)}
        >
          <p>{label}</p>
        </div>
      ))}
    </aside>
  );

}
