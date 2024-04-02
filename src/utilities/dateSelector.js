import React from "react";

export default function DateSelector({ setDateRange, dateRange }) {
  return (
    <aside className="flex flex-row items-center w-full justify-between border border-slate-200 rounded px-6 py-1.5 mt-3 mb-5 bg-slate-100  font-semibold text-slate-800 text-sm ">
      <div
        className={
          dateRange === 0
            ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5 cursor-pointer"
            : "px-3 py-0.5 mx-[1px] cursor-pointer"
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
            ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5 cursor-pointer"
            : "px-3 py-0.5 mx-[1px] cursor-pointer"
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
            ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5 cursor-pointer"
            : "px-3 py-0.5 mx-[1px] cursor-pointer"
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
            ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5 cursor-pointer"
            : "px-3 py-0.5 mx-[1px] cursor-pointer"
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
            ? "bg-white drop-shadow	 border rounded border-slate-300 px-3 py-0.5 cursor-pointer"
            : "px-3 py-0.5 mx-[1px] cursor-pointer"
        }
        onClick={() => {
          setDateRange(4);
        }}
      >
        <p>ALL</p>
      </div>
    </aside>
  );
}
