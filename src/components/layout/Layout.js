import React from "react";
import MainNavigation from "./MainNavigation";

export default function Layout(props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors">
      <MainNavigation />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {props.children}
      </main>
    </div>
  );
}
