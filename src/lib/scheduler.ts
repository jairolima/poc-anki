import { Card, Config } from './types';

const getTimestampInSeconds = () => Math.floor(Date.now() / 1000);

const applyLearningStep = (card: Card, ease: number, config: Config): Card => {
    const now = getTimestampInSeconds();
    const lrn_steps = config.lapse.delays;

    switch (ease) {
        case 1:
            return { ...card, left: lrn_steps.length, due: now + lrn_steps[0] * 60 };
        case 2:
            return { ...card, due: now + lrn_steps[1] * 60 };
        case 3:
            return card.left > 1
                ? { ...card, left: card.left - 1, due: now + lrn_steps[lrn_steps.length - card.left] * 60 }
                : { ...card, queue: 2, due: now + config.lapse.graduating_interval * 86400 };
        case 4:
            return { ...card, queue: 2, due: now + config.lapse.easy_interval * 86400 };
        default:
            return card;
    }
};

export const answerCard = (card: Card, ease: number, config: Config): Card => {
    if (card.queue === 0) return applyLearningStep(card, ease, config);
    if (card.queue === 2) return applyLearningStep(card, ease, config);
    return card;
};