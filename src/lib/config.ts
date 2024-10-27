import { Config } from './types';

export const defaultConfig: Config = {
    new_cards_per_day: 10,
    reviews_per_day: 100,
    lapse: {
        delays: [5, 10, 1440],
        relearn_steps: [10],
        graduating_interval: 3,
        easy_interval: 7,
        min_interval: 1,
        leech_threshold: 8,
    },
    order: {
        review_order: 'new_first',
        day_learn_order: 'mix',
        rev_sort_order: 'due',
    },
    advanced: {
        max_interval: 36200,
        initial_ease: 2.5,
        easy_bonus: 1.3,
        hard_multiplier: 1.2,
        again_multiplier: 0.0,
    }
};