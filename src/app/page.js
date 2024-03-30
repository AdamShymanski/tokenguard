"use client";

import Image from "next/image";

import metricks_icon from "../public/metricks_icon.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50">
      <div>
        <Image
          src={metricks_icon}
          alt="Metricks Icon"
          width={200}
          height={400}
        />
        <h2>Other metricks</h2>
      </div>
    </main>
  );
}
