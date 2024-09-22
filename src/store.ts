import random from 'lodash/random';
import {create} from 'zustand';

type State = {
  activities: Activity[];
  day: number;
  dice: number[];
  gratitude: number;
  hydration: number;
  sanity: number;
  actions: {
    nextDay: () => void;
    takeAction: (name: string, dieIndex: number) => void;
  };
};

export type Activity = {
  name: string;
  difficulty: number;
  status: 'todo' | 'success' | 'failure';
  effects: {
    gratitude: number;
    hydration: number;
    sanity: number;
  };
};

const useStore = create<State>((set) => {
  return {
    activities: generateActivities(),
    day: 0,
    dice: generateDice(),
    gratitude: 75,
    hydration: 75,
    sanity: 75,
    actions: {
      nextDay: () => {
        set((state) => {
          return {
            activities: generateActivities(),
            day: state.day + 1,
            dice: generateDice(),
            gratitude: state.gratitude - 15,
            hydration: state.hydration - 15,
            sanity: state.sanity - 15,
          };
        });
      },
      takeAction: (name, dieIndex) => {
        set((state) => {
          return {
            ...doActivity(name, state, dieIndex),
            dice: negateDie(state.dice, dieIndex),
          };
        });
      },
    },
  };
});

export const useActions = () => useStore((state) => state.actions);
export const useActivities = () => useStore((state) => state.activities);
export const useDay = () => useStore((state) => state.day);
export const useDice = () => useStore((state) => state.dice);
export const useGraditude = () => useStore((state) => state.gratitude);
export const useHydration = () => useStore((state) => state.hydration);
export const useSanity = () => useStore((state) => state.sanity);

function generateDice() {
  return [random(1, 6), random(1, 6), random(1, 6), random(1, 6), random(1, 6)];
}

/**
 * Make a die negative, to indicate it has been used, while maintaining the original value.
 */
function negateDie(dice: number[], index: number): number[] {
  // Index out of range or die has already been negated.
  if (!dice[index] || dice[index] < 0) {
    return dice;
  }
  const nextDice = dice.slice();
  nextDice[index] = nextDice[index] * -1;
  return nextDice;
}

function doActivity(
  name: string,
  state: State,
  dieIndex: number,
): Partial<State> {
  const activity = state.activities.find((activity) => activity.name === name);
  const die = state.dice[dieIndex];

  // Activity doesn't exist or is already completed.
  if (!activity || activity.status !== 'todo') {
    return {};
  }

  const rolled = random(1, die);
  const success = rolled >= random(1, activity.difficulty);

  return {
    gratitude: state.gratitude + (success ? activity.effects.gratitude : -15),
    hydration: state.hydration + (success ? activity.effects.hydration : -15),
    sanity: state.sanity + (success ? activity.effects.sanity : -15),
    activities: state.activities.map((activity) => {
      if (activity.name === name) {
        return {
          ...activity,
          status: success ? 'success' : 'failure',
        };
      }
      return activity;
    }),
  };
}

function generateActivities(): Activity[] {
  return [
    {
      name: 'Feed cats',
      status: 'todo',
      difficulty: random(1, 4),
      effects: {
        gratitude: random(5, 15),
        hydration: 0,
        sanity: random(5, 15),
      },
    },
    {
      name: 'Change diaper',
      status: 'todo',
      difficulty: random(3, 6),
      effects: {
        gratitude: 0,
        hydration: 0,
        sanity: random(5, 15),
      },
    },
    {
      name: 'Read a book',
      status: 'todo',
      difficulty: random(1, 3),
      effects: {
        gratitude: random(5, 15),
        hydration: 0,
        sanity: random(5, 15),
      },
    },
    {
      name: 'Mow grass',
      status: 'todo',
      difficulty: random(3, 5),
      effects: {
        gratitude: 0,
        hydration: 0,
        sanity: random(5, 15),
      },
    },
    {
      name: 'Drink Topochico',
      status: 'todo',
      difficulty: random(1, 3),
      effects: {
        gratitude: random(5, 15),
        hydration: random(5, 15),
        sanity: random(5, 15),
      },
    },
  ];
}
