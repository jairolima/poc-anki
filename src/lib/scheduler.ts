// lib/scheduler.ts

import { deckConfig } from "../config/deckConfig";

// Define card type
type Card = {
  id: number;
  queue: "new" | "learning" | "review" | "relearning" | "suspended";
  due: number;
  lapses: number;
  left: number;
};

// Define a function to update card based on the response
export const answerCard = (card: Card, ease: number): Card => {
  const currentTime = Date.now();
  const { lrnSteps, easyInterval, relearnSteps } = deckConfig;

  switch (card.queue) {
    case "new":
      return handleNewCard(card, ease, currentTime, lrnSteps, easyInterval);
    case "learning":
      return handleLrnCard(card, ease, currentTime, lrnSteps, easyInterval);
    case "relearning":
      return handleRelearnCard(card, ease, currentTime, relearnSteps);
    case "review":
      return handleRevCard(card, ease, currentTime);
    default:
      return card;
  }
};

const handleNewCard = (card: Card, ease: number, currentTime: number, lrnSteps: number[], easyInterval: number): Card => {
  // Handle new card logic based on ease level
  if (ease === 1) { // Again
    return { ...card, left: lrnSteps.length - 1, queue: "learning", due: currentTime + 5 * 60 * 1000 };
  } else if (ease === 2) { // Hard
    return { ...card, left: lrnSteps.length - 1, queue: "learning", due: currentTime + (5 + 10) / 2 * 60 * 1000 };
  } else if (ease === 3) { // Good
    return { ...card, left: lrnSteps.length - 2, queue: "learning", due: currentTime + 10 * 60 * 1000 };
  } else if (ease === 4) { // Easy
    return { ...card, queue: "review", due: currentTime + easyInterval * 86400 * 1000 };
  }
  return card;
};

const handleLrnCard = (card: Card, ease: number, currentTime: number, lrnSteps: number[], easyInterval: number): Card => {
  // Handle learning card logic
  if (ease === 1) { // Again
    return { ...card, due: currentTime + 5 * 60 * 1000 };
  } else if (ease === 2) { // Hard
    if (card.left === 1) {
      return { ...card, left: card.left, due: currentTime + 10 * 60 * 1000 }; // 10 min
    } else {
      return { ...card, due: currentTime + (5 + 10) / 2 * 60 * 1000 }; // 7,5 min
    }
  } else if (ease === 3) { // Good
    if (card.left > 1) {
      return { ...card, left: card.left - 1, due: currentTime + 10 * 60 * 1000 };  // 10 min
    } else {
      return { ...card, left: 0, queue: "review", due: currentTime + 86400 * 1000 }; // 1 day
    }
  } else if (ease === 4) { // Easy
    return { ...card, left: 0, queue: "review", due: currentTime + easyInterval * 86400 * 1000 };
  }
  return card;
};

const handleRelearnCard = (card: Card, ease: number, currentTime: number, relearnSteps: number[]): Card => {
  // Lógica de reaprendizagem do cartão
  const { leechThreshold, easyInterval, graduatingInterval } = deckConfig;

  if (card.lapses >= leechThreshold) {  // Verifica se o número de lapsos atingiu o limite
    return { 
      ...card, 
      queue: "suspended", // Move o cartão para a fila de "Suspensos"
      due: currentTime + 86400 * 1000 // Define a próxima revisão para o dia seguinte
    };
  }

  if (ease === 1) { // "Again" (Novamente)
    return { 
      ...card,
      lapses: card.lapses + 1, 
      due: currentTime + 10 * 60 * 1000 // Reseta o tempo para 10 minutos
    };
  } else if (ease === 2) { // "Hard" (Difícil)
    // Aplica o multiplicador para "Hard"
    const hardInterval = relearnSteps[0] * 1.2; // 10 minutos * 1.2
    return { 
      ...card, 
      due: currentTime + hardInterval * 60 * 1000 // Calcula o tempo de "Hard" com multiplicador
    };
  } else if (ease === 3) { // "Good" (Bom)
    return { 
      ...card, 
      queue: "review", // Coloca o cartão na fila de revisão
      due: currentTime + graduatingInterval * 86400 * 1000 // 3 dias para "Good"
    };
  } else if (ease === 4) { // "Easy" (Fácil)
    return { 
      ...card, 
      queue: "review", // Coloca o cartão na fila de revisão
      due: currentTime + easyInterval * 86400 * 1000 // 7 dias para "Easy"
    };
  }
  return card; // Retorna o cartão inalterado se nenhuma condição for atendida
};

const handleRevCard = (card: Card, ease: number, currentTime: number): Card => {
  // Handle review card logic
  const { hardMultiplier, initialEase, easyBonus, easyInterval } = deckConfig;
  if (ease === 1) { // Again
    return { ...card, lapses: card.lapses + 1, queue: "relearning", due: currentTime };
  } else if (ease === 2) { // Hard
    return { ...card, due: currentTime + (easyInterval * 86400 * 1000 * hardMultiplier) }; // 7 dias para "Hard" + 1.2 (hardMultiplier) de multiplicador
  } else if (ease === 3) { // Good
    return { ...card, due: currentTime + (easyInterval * 86400 * 1000 * initialEase) }; // 7 dias para "Good" + 2.5 (initialEase) de multiplicador
  } else if (ease === 4) { // Easy
    return { ...card, due: currentTime + (easyInterval * 86400 * 1000 * (easyBonus + initialEase)) }; // 7 dias para "Easy" + 2.5 + 1.3 (easyBonus) de multiplicador
  }
  return card;
};