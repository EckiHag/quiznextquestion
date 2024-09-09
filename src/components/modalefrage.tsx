import React, { useState } from "react"
import { jokerGifs } from "../antworten/jokerGifs"
import { antwortenRichtig } from "../antworten/antwortenRichtig"
import { antwortenFalsch } from "../antworten/antwortenFalsch"

// Definiere den Typ für die Frage
interface Frage {
  question: string
  options: string[]
  answer: number
}

// Typdefinition für die Props der Komponente
interface ModaleFrageProps {
  frage: Frage
}

export default function ModaleFrage({ frage }: ModaleFrageProps) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [message1, setMessage1] = useState("")
  const [message2, setMessage2] = useState("")

  if (!frage || !frage.options) {
    return <p>Keine Frage verfügbar.</p>
  }

  const handleOptionClick = (choosenNumber: number) => {
    const rightNumber = frage.answer
    const rightAnswerText = frage.options[rightNumber - 1]
    const antwortRichtigText = antwortenRichtig[Math.floor(Math.random() * antwortenRichtig.length)]
    const antwortFalschText = antwortenFalsch[Math.floor(Math.random() * antwortenFalsch.length)]
    console.log("choosenNumber, rightNumber: ", choosenNumber, rightNumber)

    if (Number(choosenNumber) === Number(rightNumber)) {
      setMessage1(`${antwortRichtigText}`)
      setMessage2(`"${rightAnswerText}" ist richtig!`)
    } else {
      setMessage1(`${antwortFalschText}`)
      setMessage2(`"${rightAnswerText}" ist richtig!`)
    }
    setShowAnswer(true)
  }

  const jokerGif = jokerGifs[Math.floor(Math.random() * jokerGifs.length)]

  if (frage.question === "Joker") {
    return (
      <div className="flex flex-col items-center bg-[#005a6e] h-screen">
        <div className="h-[70vh] w-[90vw] text-white bg-[#005a6e] px-24">
          <div className="text-center text-4xl mt-2">Joker</div>
          <div className="text-center text-3xl mt-2">
            <img src={`${jokerGif}`} alt="Ein lustiges GIF" />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center bg-[#005a6e] h-screen">
        <div className="h-[70vh] w-[90vw] text-white bg-[#005a6e] px-24">
          <div className="text-center text-4xl mt-2">Frage: {frage.question}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {frage.options.map((option, index) => (
              <button key={index} id={`answer${index + 1}`} className={`bg-[#008cba] text-white border-none py-2 px-4 rounded-lg text-xl h-28 transition-all ease-in-out duration-300 hover:bg-[#005a6e]`} onClick={() => handleOptionClick(index + 1)}>
                {String.fromCharCode(65 + index)} = {option}
              </button>
            ))}
          </div>
          {showAnswer && (
            <div>
              <p className="text-3xl mt-5 text-green-500">{message1}</p>
              <p className="text-3xl mt-5">{message2}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
