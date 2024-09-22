import random from 'lodash/random';
import {create} from 'zustand';

type State = {
  day: number;
  dice: Array<number>;
  actions: {
    nextDay: () => void;
    pickDie: (index: number) => void;
  };
};

const useStore = create<State>((set) => {
  return {
    day: 0,
    dice: [],
    actions: {
      nextDay: () => {
        set((state) => {
          return {
            day: state.day + 1,
            dice: [
              random(1, 6),
              random(1, 6),
              random(1, 6),
              random(1, 6),
              random(1, 6),
            ],
          };
        });
      },
      pickDie: (index) => {
        set((state) => {
          if (!state.dice[index]) {
            return {};
          }

          if (state.dice[index] < 0) {
            return {};
          }

          const nextDice = state.dice.slice();
          nextDice[index] = nextDice[index] * -1;

          return {
            dice: nextDice,
          };
        });
      },
    },
  };
});

export const useDay = () => useStore((state) => state.day);
export const useDice = () => useStore((state) => state.dice);
export const useActions = () => useStore((state) => state.actions);
