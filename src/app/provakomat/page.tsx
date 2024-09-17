"use client"

import React, { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { provokationen } from "@/fragen/Provokationen"

function Provakomat() {
  // Definiere den Zustand 'these' als string (oder optional als string | undefined, falls es am Anfang undefined sein kann)
  const [these, setThese] = useState<string | undefined>(undefined)

  useEffect(() => {
    setThese(generiereThese())
  }, [])

  const generiereThese = (): string => {
    const strSubjekt = provokationen[Math.floor(Math.random() * provokationen.length)]
    return strSubjekt
  }

  const handleNeueThese = () => {
    setThese(generiereThese())
  }

  return (
    <>
      <div className="flex flex-col items-center vertical-center-footer bg-gray-100">
        <h1 className="text-4xl font-bold text-center my-8">Provokationen</h1>
        <div className="text-4xl text-center my-5 max-w-[600px]">{these}</div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={() => handleNeueThese()}
        >
          Neue Provokation
        </button>
      </div>

      <Footer />
    </>
  )
}

export default Provakomat