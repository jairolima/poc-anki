export type Card = {
  id: number;
  pergunta: string;
  resposta: string;
  queue: "new" | "learning" | "review" | "relearning" | "suspended";
  due: number;
  lapses: number;
  left: number;
};

export const cards: Card[] = [
  {
    id: 1,
    pergunta: "What is the plural of 'child'?",
    resposta: "Children",
    queue: "new",
    due: Date.now(),
    lapses: 0,
    left: 0,
  },
  {
    id: 2,
    pergunta: "What is the past tense of 'go'?",
    resposta: "Went",
    queue: "new",
    due: Date.now(),
    lapses: 0,
    left: 0,
  },
  {
    id: 3,
    pergunta: "What is the comparative form of 'good'?",
    resposta: "Better",
    queue: "new",
    due: Date.now(),
    lapses: 0,
    left: 0,
  },
  {
    id: 4,
    pergunta: "What is the past participle of 'eat'?",
    resposta: "Eaten",
    queue: "new",
    due: Date.now(),
    lapses: 0,
    left: 0,
  },
  {
    id: 5,
    pergunta: "What is the plural of 'tooth'?",
    resposta: "Teeth",
    queue: "new",
    due: Date.now(),
    lapses: 0,
    left: 0,
  }
]