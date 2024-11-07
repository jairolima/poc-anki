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
    return { ...card, left: lrnSteps.length, queue: "learning", due: currentTime + 5 * 60 * 1000 };
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
    return { ...card, left: lrnSteps.length, due: currentTime + 5 * 60 * 1000 };
  } else if (ease === 2) { // Hard
    return { ...card, due: currentTime + (5 + 10) / 2 * 60 * 1000 };
  } else if (ease === 3) { // Good
    if (card.left > 1) {
      return { ...card, left: card.left - 1, due: currentTime + lrnSteps[lrnSteps.length - card.left] * 60 * 1000 };
    } else {
      return { ...card, left: 0, queue: "review", due: currentTime + 86400 * 1000 }; // 1 day
    }
  } else if (ease === 4) { // Easy
    return { ...card, left: 0, queue: "review", due: currentTime + easyInterval * 86400 * 1000 };
  }
  return card;
};

const handleRelearnCard = (card: Card, ease: number, currentTime: number, relearnSteps: number[]): Card => {
  // Handle relearning card logic
  if (ease === 1) { // Again
    return { ...card, due: currentTime + 10 * 60 * 1000 }; // Reset to 10 minutes
  } else if (ease === 3 || ease === 4) { // Good or Easy
    return { ...card, queue: "review", due: currentTime + relearnSteps[0] * 86400 * 1000 };
  }
  return card;
};

const handleRevCard = (card: Card, ease: number, currentTime: number): Card => {
  // Handle review card logic
  const { hardMultiplier, easyBonus } = deckConfig;
  if (ease === 1) { // Again
    return { ...card, lapses: card.lapses + 1, queue: "relearning", due: currentTime + 10 * 60 * 1000 };
  } else if (ease === 2) { // Hard
    return { ...card, due: currentTime + card.due * hardMultiplier };
  } else if (ease === 3) { // Good
    return { ...card, due: currentTime + card.due * 2.5 };
  } else if (ease === 4) { // Easy
    return { ...card, due: currentTime + card.due * 2.5 * easyBonus };
  }
  return card;
};