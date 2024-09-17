//quiz/[klasse].tsx
"use client"

import { useParams } from 'next/navigation';
import PageQuizSinData from '@/components/quizsindata';
import { Klasse5Verschiedene } from '@/fragen/Klasse5Verschiedene';
import { Klasse7Verschiedene } from '@/fragen//Klasse7Verschiedene';
import { Klasse9Verschiedene } from '@/fragen/Klasse9Verschiedene';
import { Klasse10Verschiedene } from '@/fragen/Klasse10Verschiedene';
import { Klasse11Q1Verschiedene } from '@/fragen/Klasse11Q1Verschiedene';

const QuizPage = () => {
  const params = useParams(); // Holt die Parameter der Route
  const { klasse } = params; // Extrahiere den "klasse"-Parameter

  let daten: any;
  let titel: string;

  // Entscheide, welche Daten geladen werden sollen
  switch (klasse) {
    case 'klasse5verschiedene':
      daten = Klasse5Verschiedene;
      titel = "Klasse 5 Verschiedene"
      break;
    case 'klasse7verschiedene':
      daten = Klasse7Verschiedene;
      titel = "Klasse 7 Verschiedene"
      break;
    case 'klasse9verschiedene':
      daten = Klasse9Verschiedene;
      titel = "Klasse 9 Verschiedene"
      break;
    case 'klasse10verschiedene':
      daten = Klasse10Verschiedene;
      titel = "Klasse 10 Verschiedene"
      break;
    case 'klasse11q1verschiedene':
        daten = Klasse11Q1Verschiedene;
        titel = "Klasse 11 / Q1 Verschiedene"
        break;
    default:
      daten = []; // Fallback oder Fehlerbehandlung
      titel = "leer" }

  // Übergib die Daten an die Komponente
  return <PageQuizSinData daten={daten} titel={titel} />;
};

export default QuizPage;