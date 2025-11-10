import React from "react";
import MainNavigation from "./MainNavigation";

export default function Layout(props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <MainNavigation />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10 xl:max-w-[90rem]">
        {props.children}
      </main>
    </div>
  );
}
