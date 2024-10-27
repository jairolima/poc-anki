export type Config = {
  new_cards_per_day: number;
  reviews_per_day: number;
  lapse: {
      delays: number[];
      relearn_steps: number[];
      graduating_interval: number;
      easy_interval: number;
      min_interval: number;
      leech_threshold: number;
  };
  order: {
      review_order: 'new_first' | 'rev_first' | 'mix';
      day_learn_order: 'mix' | 'separate';
      rev_sort_order: 'due' | 'random';
  };
  advanced: {
      max_interval: number;
      initial_ease: number;
      easy_bonus: number;
      hard_multiplier: number;
      again_multiplier: number;
  };
};

export type Card = {
  did: number;       // ID do baralho (deck ID) ao qual o cartão pertence. Representa um número único que identifica o baralho.
  queue: number;     // Estado atual do cartão, onde os valores representam diferentes fases:
                     // 0 - Novo, 1 - Aprendendo, 2 - Revisão, 3 - Reaprendendo, 4 - Suspenso.
  due: number;       // Data e hora (em formato timestamp) para quando o cartão está agendado para a próxima revisão.
  left: number;      // Número de etapas restantes para completar o aprendizado ou reaprendizado deste cartão.
  lapses: number;    // Contador de quantas vezes o cartão foi esquecido. Esse valor pode influenciar o intervalo de reaprendizado.
};