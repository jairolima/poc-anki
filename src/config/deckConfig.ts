export const deckConfig = {
  newCardsPerDay: 10,            // Número de novos cartões por dia
  reviewsPerDay: 100,            // Número máximo de revisões por dia
  lrnSteps: [5, 10, 1440],       // Passos de aprendizado (em minutos)
  relearnSteps: [10],            // Passos de reaprendizado (em minutos)
  graduatingInterval: 3,         // Intervalo para cartões graduarem (em dias)
  easyInterval: 4,               // Intervalo para cartões fáceis (em dias)
  minInterval: 1,                // Intervalo mínimo (em dias)
  leechThreshold: 8,             // Limite de lapsos para marcar um cartão como "leech"

  // Configurações avançadas
  maxInterval: 36200,            // Intervalo máximo (em dias)
  initialEase: 2.5,              // Facilidade inicial
  easyBonus: 1.3,                // Multiplicador para cartões fáceis
  hardMultiplier: 1.2,           // Multiplicador para cartões difíceis
  againMultiplier: 0.0,          // Multiplicador para cartões de repetição imediata
};