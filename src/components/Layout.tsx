import React, { ReactNode } from "react";

const OFFSET_Y = 100;

type LayoutProps = {
  top?: ReactNode;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};


export default function Layout({ top, left, center, right }: LayoutProps) {
  return (
    <div className="p-5 flex flex-col box-border">
      {/* Zone top (sous le header global) */}
      {top && (
        <header className="h-[100px] flex items-center justify-center text-center">
          {top}
        </header>
      )}

      {/* Zone gauche / centre / droite */}
      <div
        className="h-[100px] flex flex-1 gap-5"
        style={{ marginTop: OFFSET_Y }}
      >
        {/* Gauche : 25% */}
        <aside className="hidden md:flex w-1/4 items-center justify-center ">
          {left}
        </aside>

        {/* Centre : 50% */}
        <main className="w-1/2 flex items-center justify-center">
          {center}
        </main>

        {/* Droite : 25% */}
        <aside className="hidden md:flex w-1/4 items-center justify-center ">
          {right}
        </aside>
      </div>
    </div>
  );
}
