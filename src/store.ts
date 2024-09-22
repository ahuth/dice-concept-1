import random from 'lodash/random';
import {create} from 'zustand';

type State = {
  day: number;
  dice: number[];
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
            dice: generateDice(),
          };
        });
      },
      pickDie: (index) => {
        set((state) => {
          return {
            dice: negateDie(state.dice, index),
          };
        });
      },
    },
  };
});

export const useDay = () => useStore((state) => state.day);
export const useDice = () => useStore((state) => state.dice);
export const useActions = () => useStore((state) => state.actions);

function generateDice() {
  return [random(1, 6), random(1, 6), random(1, 6), random(1, 6), random(1, 6)];
}

function negateDie(dice: number[], index: number): number[] {
  // Index out of range or die has already been negated.
  if (!dice[index] || dice[index] < 0) {
    return dice;
  }
  const nextDice = dice.slice();
  nextDice[index] = nextDice[index] * -1;
  return nextDice;
}
