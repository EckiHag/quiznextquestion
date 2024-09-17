// Thesomat.tsx
"use client"

import React, { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import { thesenteile } from "@/fragen/Thesenteile";

// Definieren von Typen für These (string oder undefined)
const Thesomat: React.FC = () => {
  const [these, setThese] = useState<string | undefined>();

  useEffect(() => {
    setThese(generiereThese());
  }, []);

  const generiereThese = (): string => {
    const strSubjekt =
      thesenteile.subjekt[Math.floor(Math.random() * thesenteile.subjekt.length)];
    const strAdverb =
      thesenteile.adverb[Math.floor(Math.random() * thesenteile.adverb.length)];
    const strConclusion =
      thesenteile.conclusion[
        Math.floor(Math.random() * thesenteile.conclusion.length)
      ];

    return `${strSubjekt} ${strAdverb} ${strConclusion}.`;
  };

  const handleNeueThese = () => {
    setThese(generiereThese());
  };

  return (
    <>
      <div className="flex flex-col items-center pt-10 vertical-center-footer bg-gray-100">
        <h1 className="text-5xl font-bold text-center mb-4">Thesomat</h1>
        <div className="text-4xl font-semibold text-center my-4">{these}</div>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          onClick={handleNeueThese}
        >
          Neue These
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Thesomat;
