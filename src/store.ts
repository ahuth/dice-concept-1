import random from 'lodash/random';
import {create} from 'zustand';

type State = {
  day: number;
  dice: Array<number | null>;
  actions: {
    incrementDay: () => void;
  };
};

const useStore = create<State>((set) => {
  return {
    day: 0,
    dice: [],
    actions: {
      incrementDay: () =>
        set((state) => ({
          day: state.day + 1,
          dice: [
            random(1, 6),
            random(1, 6),
            random(1, 6),
            random(1, 6),
            random(1, 6),
          ],
        })),
    },
  };
});

export const useDay = () => useStore((state) => state.day);
export const useDice = () => useStore((state) => state.dice);
export const useActions = () => useStore((state) => state.actions);
