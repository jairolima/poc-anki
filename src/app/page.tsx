"use client"

import { useState } from "react";
import { cards, Card } from "../data/cards";
import { answerCard } from "../lib/scheduler";

export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardList, setCardList] = useState<Card[]>(cards); // Especifica o tipo explicitamente

  const handleAnswer = (ease: number) => {
    // Faz uma cópia do card atual e garante que ele tenha todas as propriedades do tipo 'Card'
    const updatedCard: Card = {
      ...cardList[currentCardIndex],
      ...answerCard(cardList[currentCardIndex], ease)
    };
    const newCardList = [...cardList];
    newCardList[currentCardIndex] = updatedCard; // Atualiza o card modificado na lista
    setCardList(newCardList);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardList.length); // Navega para o próximo card
  };

  const currentCard = cardList[currentCardIndex];

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold">Prototipo comportamento cards</h1>
      <div className="mt-4">
        <p><strong>Pergunta:</strong> {currentCard.pergunta}</p>
        <p><strong>Resposta:</strong> {currentCard.resposta}</p>
        <p>ID do Cartão: {currentCard.id}</p>
        <p>Fila: {currentCard.queue}</p>
        <p>Data de Revisão: {new Date(currentCard.due).toLocaleString()}</p>
        <p>Lapso: {currentCard.lapses}</p>
        <p>Passos Restantes: {currentCard.left}</p>
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={() => handleAnswer(1)} className="px-4 py-2 bg-red-500 text-white rounded">
          Tentar Novamente
        </button>
        <button onClick={() => handleAnswer(2)} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Difícil
        </button>
        <button onClick={() => handleAnswer(3)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Bom
        </button>
        <button onClick={() => handleAnswer(4)} className="px-4 py-2 bg-green-500 text-white rounded">
          Fácil
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-12">
        <h1>Lista dos cards e seus comportamentos para teste:</h1>
        {cardList.map((card: Card) => (
          <div key={card.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{card.pergunta}</h2>
            <p><strong>Resposta:</strong> {card.resposta}</p>
            <p><strong>Vence em:</strong> {new Date(card.due).toLocaleString()}</p>
            <p><strong>Fila:</strong> {card.queue}</p>
            <p><strong>Lapses:</strong> {card.lapses}</p>
            <p><strong>Etapas Restantes:</strong> {card.left}</p>
          </div>
        ))}
      </div>
    </div>
  );
}