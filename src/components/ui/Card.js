import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/70 bg-white/80 p-0 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/60 dark:shadow-black/40 ${className}`}
    >
      {children}
    </div>
  );
}
