// Footer.tsx
import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full min-h-[50px] flex items-center justify-between px-6 py-3 bg-washedwhite dark:bg-gray-900 text-deepblue dark:text-washedwhite">
      
      <div className="flex-1 text-center">
        <span className="text-xs italic font-subcontent">
          &copy; {new Date().getFullYear()} WakfuTools. Développé par Mylgasia - Projet non affilié à Ankama, détenteur de la licence Wakfu.
        </span>
      </div>



    </footer>
  );
}
