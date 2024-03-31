import { useState } from "react";

export default function DateSelector() {
  return (
    <aside className="flex flex-row items-center w-full justify-between border border-slate-300 rounded px-6 py-2 mt-3 bg-white drop-shadow-md font-semibold text-slate-800 text-sm">
      <div>
        <p>1W</p>
      </div>
      <div>
        <p>2W</p>
      </div>
      <div>
        <p>4W</p>
      </div>
      <div>
        <p>3M</p>
      </div>
      <div>
        <p>ALL</p>
      </div>
    </aside>
  );
}
