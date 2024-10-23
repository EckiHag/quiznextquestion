"use client"

import React, { useState, useEffect } from "react"
import { Footer } from "./footer"
import ModaleFrage from "./modalefrage"
import { useAdmin } from '@/hooks/useAdmin';
import Modal from 'react-modal';


interface PageQuizSinDataProps {
  daten: any[];
  titel: string
}

function PageQuizSinData({ daten, titel }: PageQuizSinDataProps) {
  console.log("Titel: ", titel)
  const { isAdmin, loading } = useAdmin(); 
  const [fragenUndAntworten, setFragenUndAntworten] = useState<any[]>(daten);

  const [currentFrage, setCurrentFrage] = useState<any>(null);
  const [showFrage, setShowFrage] = useState(false);
  const [clickedCells, setClickedCells] = useState<number[][]>([]);

  const themenAnzahl = fragenUndAntworten.length;
  const themenNamen = fragenUndAntworten.map((thema) => Object.keys(thema)[0]);

  const holFrage = (spalte: number, zeile: number) => {
    const fach = fragenUndAntworten[spalte];
    const schluessel = Object.keys(fach)[0];
    console.log("Fach:", fach);
    return fach[schluessel][zeile];
  };

  const handleClick = (i: number, j: number) => {
    setClickedCells((prevCells) => [...prevCells, [i, j]]);
    const frage = holFrage(j, i);
    if (frage && frage.question && frage.options) {
      setCurrentFrage(frage);
      setShowFrage(true);
    } else {
      setShowFrage(false);
    }
  };

  const handleReset = () => {
    setClickedCells([]);
  };

  const handleCloseModal = () => {
    setShowFrage(false);
  };

  if (loading) {
    return <p>Loading...</p>; // Ladesymbol während der Prüfung
  }

  if (!isAdmin) {
    return <p>Access Denied. You must be of role ADMIN to view this page. If you are ADMIN please refresh the browser!</p>; // Zugangsverweigerung
  }

  return (
    <>
    <div>
      <div className="container mx-auto p-6 max-w-full vertical-center-footer">
        <h1 className="text-3xl font-bold text-center mb-6">Quiz {titel}</h1>


        <table className="table-auto w-full border-collapse mb-6">
  <thead>
    <tr>
      <th></th>
      {themenNamen.map((themaName) => (
        <th key={themaName} className="px-1 sm:px-4 py-2 bg-gray-200 text-[7px] sm:text-lg">
          {themaName}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {[...Array(6)].map((_, i) => (
      <tr key={i}>
        <td className="px-4 py-2 border text-xs sm:text-lg">{20 + i * 20}</td>
        {[...Array(themenAnzahl)].map((_, j) => (
          <td
            key={j}
            className={`px-4 py-2 border ${
              clickedCells.some((cell) => cell[0] === i && cell[1] === j) ? "bg-yellow-300" : ""
            } cursor-pointer text-xs sm:text-sm`} 
            onClick={() => handleClick(i, j)}
          >
            <img
              src="../icons/Rocket.png"
              className="mx-auto w-4 sm:w-12"
              alt="Quiz Icon"
            />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700" onClick={handleReset}>
          Reset
        </button>
        {
          <Modal
          isOpen={showFrage}
          onRequestClose={handleCloseModal}
          ariaHideApp={false}
          contentLabel="Frage Modal"
          style={{
            content: {
              padding: "20px",
              position: "absolute",
              overflow: "auto",
              borderRadius: "10px",
              border: "none",
              background: "#fff",
              maxHeight: "calc(100% - 40px)",
              maxWidth: "calc(100% - 60px)",
              display: "flex",
              flexDirection: "column",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: 1000,
            },
          }}
        >
          {currentFrage && (
            <>
              <div className="flex-1 overflow-y-auto">
                <>
                  <div className="flex-1 overflow-y-auto">
                    <ModaleFrage frage={currentFrage} />
                  </div>
                </>
              </div>
              <div className="text-center mt-4">
                <button onClick={handleCloseModal} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  Close
                </button>
              </div>
            </>
          )}
        </Modal>
        }

      </div>

    </div>      
    <Footer />
    </>
  );
}

export default PageQuizSinData;
