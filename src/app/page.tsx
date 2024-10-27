"use client";

import { useState } from 'react';
import CardDisplay from '../components/CardDisplay';
import { Card } from '../lib/types';
import { answerCard } from '../lib/scheduler';
import { defaultConfig } from '../lib/config';
import { englishCards } from '../lib/cards';

const questions = [
    "What is the translation of 'apple'?",
    "How do you say 'book' in English?",
    "Translate 'sun' to English.",
    "What does 'car' mean in English?",
    "How do you say 'house' in English?",
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cards, setCards] = useState<Card[]>(englishCards);
    const [reviewCards, setReviewCards] = useState<Card[]>([]); // Estado para cards em revisão

    const handleAnswer = (ease: number) => {
        const currentCard = cards[currentIndex];
        const updatedCard = answerCard(currentCard, ease, defaultConfig);
        const updatedCards = [...cards];

        // Se a resposta for "difícil" (exemplo, vamos supor que ease=2) ou "deixe para mais tarde" (ease=3)
        if (ease === 2 || ease === 3) {
            // Remove o card do array principal e adiciona ao de revisão
            updatedCards.splice(currentIndex, 1);
            setReviewCards((prev) => [...prev, currentCard]);
        } else {
            // Atualiza o card normalmente
            updatedCards[currentIndex] = updatedCard;
        }

        setCards(updatedCards);
        
        // Avança para a próxima pergunta, se houver
        setCurrentIndex((prevIndex) => (prevIndex + 1) % updatedCards.length);
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <CardDisplay
                    card={cards[currentIndex]}
                    question={questions[currentIndex]}
                    onAnswer={handleAnswer}
                />
            </div>

            {/* Lista de cards com explicação de cada atributo */}
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Lista de Cards</h2>
                <ul className="space-y-4">
                    {cards.map((card, index) => (
                        <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Card {index + 1}</h3>
                            <p><strong>Deck ID (did):</strong> {card.did} - ID do baralho ao qual o cartão pertence.</p>
                            <p><strong>Estado (queue):</strong> {card.queue} - Indica o estado do cartão (0: Novo, 1: Aprendendo, 2: Revisão, 3: Reaprendendo, 4: Suspenso).</p>
                            <p><strong>Próxima Revisão (due):</strong> {card.due ? new Date(card.due * 1000).toLocaleString() : 'Não agendado'} - Indica quando o cartão será revisado novamente.</p>
                            <p><strong>Etapas Restantes (left):</strong> {card.left} - Número de etapas restantes no aprendizado.</p>
                            <p><strong>Esquecimentos (lapses):</strong> {card.lapses} - Número de vezes que o cartão foi esquecido.</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Lista de cards em revisão */}
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Cards em Revisão</h2>
                <ul className="space-y-4">
                    {reviewCards.map((card, index) => (
                        <li key={index} className="bg-white p-4 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Card em Revisão {index + 1}</h3>
                            <p><strong>Deck ID (did):</strong> {card.did}</p>
                            <p><strong>Estado (queue):</strong> {card.queue}</p>
                            <p><strong>Próxima Revisão (due):</strong> {card.due ? new Date(card.due * 1000).toLocaleString() : 'Não agendado'}</p>
                            <p><strong>Etapas Restantes (left):</strong> {card.left}</p>
                            <p><strong>Esquecimentos (lapses):</strong> {card.lapses}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}